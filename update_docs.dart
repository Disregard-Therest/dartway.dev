import 'dart:io';

Future<void> main() async {
  print('🔄 Updating DartWay Guidelines for Docusaurus...');

  await _ensureRemote();

  // 1. Подтянуть свежую версию через git subtree
  final pull = await Process.run('git', [
    'subtree',
    'pull',
    '--prefix=dartway/guidelines',
    'dartway_guidelines',
    'main',
    '--squash',
  ]);

  if (pull.exitCode != 0) {
    stderr.writeln('❌ Git subtree pull failed:\n${pull.stderr}');
    stderr.writeln(
      '💡 Hint: Commit or stash your changes before running update.',
    );
    exit(1);
  }
  print('✅ Guidelines updated from remote.');

  // 2. Foundations → docs/3. foundations
  _copyDocs(
    'dartway/guidelines/dev-guidelines/foundations',
    'docs/3. foundations',
  );

  // 3. Flutter → docs/4. flutter
  _copyDocs('dartway/guidelines/dev-guidelines/flutter', 'docs/4. flutter');

  // 4. Server → docs/5. server
  _copyDocs('dartway/guidelines/dev-guidelines/server', 'docs/5. server');

  print('✨ Guidelines copied into Docusaurus docs!');
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

void _copyDocs(String source, String destination) {
  final srcDir = Directory(source);
  if (!srcDir.existsSync()) {
    print('⚠️ Source not found: $source');
    return;
  }

  final destDir = Directory(destination);
  if (destDir.existsSync()) {
    destDir.deleteSync(recursive: true);
  }
  destDir.createSync(recursive: true);

  for (final entity in srcDir.listSync(recursive: true)) {
    if (entity is File && entity.path.endsWith('.md')) {
      final relativePath = entity.path
          .replaceFirst(srcDir.path, '')
          .replaceAll('\\', '/');

      final destFile = File('${destDir.path}$relativePath');

      destFile.parent.createSync(recursive: true);
      entity.copySync(destFile.path);

      print('📄 ${entity.path} → ${destFile.path}');
    }
  }

  print('📂 Copied docs: $source → $destination');
}
