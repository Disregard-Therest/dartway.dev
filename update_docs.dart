import 'dart:convert';
import 'dart:io';

Future<void> main() async {
  print('🔄 Updating DartWay Guidelines for Docusaurus (no subtree)...');

  await _ensureRemote();

  // 1. Подтянуть свежие изменения из remote
  final fetch = await Process.run('git', [
    'fetch',
    'dartway_guidelines',
    'main',
  ]);
  if (fetch.exitCode != 0) {
    stderr.writeln('❌ Git fetch failed:\n${fetch.stderr}');
    exit(1);
  }
  print('✅ Guidelines fetched from remote.');

  // 2. Скопировать категории
  _copyDocsFromGit('dev-guidelines/foundations', 'docs/3. foundations');
  _copyDocsFromGit('dev-guidelines/flutter', 'docs/4. flutter');
  _copyDocsFromGit('dev-guidelines/server', 'docs/5. server');

  print('✨ Guidelines synced into Docusaurus docs!');
}

Future<void> _ensureRemote() async {
  final result = await Process.run('git', ['remote']);
  if (result.exitCode != 0) {
    throw Exception('git remote failed: ${result.stderr}');
  }

  final remotes =
      (result.stdout as String)
          .split('\n')
          .map((e) => e.trim())
          .where((e) => e.isNotEmpty)
          .toList();

  if (!remotes.contains('dartway_guidelines')) {
    print('➕ Adding remote dartway_guidelines...');
    final add = await Process.run('git', [
      'remote',
      'add',
      'dartway_guidelines',
      'https://github.com/dartway/dartway_guidelines.git',
    ]);
    if (add.exitCode != 0) {
      throw Exception('git remote add failed: ${add.stderr}');
    }
    print('✅ Remote dartway_guidelines added.');
  } else {
    print('✅ Remote dartway_guidelines already exists.');
  }
}

void _copyDocsFromGit(String sourcePath, String destinationPath) {
  final destDir = Directory(destinationPath);
  if (!destDir.existsSync()) {
    destDir.createSync(recursive: true);
  }

  // удаляем старые .md (оставляем _category_.json)
  for (final entity in destDir.listSync(recursive: true)) {
    if (entity is File && entity.path.endsWith('.md')) {
      entity.deleteSync();
    }
  }

  // достаём список файлов в директории из FETCH_HEAD
  final lsTree = Process.runSync('git', [
    'ls-tree',
    '-r',
    '--name-only',
    'dartway_guidelines/main',
    sourcePath,
  ]);

  if (lsTree.exitCode != 0) {
    stderr.writeln('⚠️ Failed to list files for $sourcePath: ${lsTree.stderr}');
    return;
  }

  final files = (lsTree.stdout as String)
      .split('\n')
      .where((f) => f.endsWith('.md'));

  for (final file in files) {
    if (file.isEmpty) continue;

    final content = Process.runSync('git', [
      'show',
      'dartway_guidelines/main:$file',
    ], stdoutEncoding: utf8);

    if (content.exitCode != 0) {
      stderr.writeln('⚠️ Failed to read file $file: ${content.stderr}');
      continue;
    }

    final relativePath = file.replaceFirst(sourcePath, '');
    final destFile = File('$destinationPath$relativePath');

    destFile.parent.createSync(recursive: true);
    destFile.writeAsStringSync(content.stdout as String, encoding: utf8);

    print('📄 $file → ${destFile.path}');
  }
}
