---
title: Files and Uploads
description: Moving bytes in and out of an app without going through your own server twice
---

# Files and Uploads

Getting a photo, a document or a video from a device into storage, and back out
to whoever may see it. Simple until the file is large, the network is a train,
or the file is not what it claims to be.

**Why it matters.** Uploads are the most common place a mobile app burns a
user's data allowance and patience, and file endpoints are a favourite way in for
anyone probing an application. Both problems are avoided by design, not by
fixing later.

## What to understand

- Where the bytes actually travel, and whether your server needs to be in the path
- What the file is, as opposed to what its name and content type claim
- Who may read it once stored, and how that is enforced
- What happens when the upload fails at eighty percent
- What it costs to store, serve and keep

## Core topics

### Uploading

- Direct to storage with a signed URL, instead of through your server
- Multipart and chunked uploads, and resuming a broken one
- Progress, cancellation, and background uploads on mobile
- Size limits enforced before the bytes arrive, not after

### Validating

- Content type from the bytes, never from the request
- Extension and magic-number checks, and their limits
- Image dimension and file size limits
- Treating every uploaded file as hostile — including the filename

### Storing

- Object storage against a filesystem against the database
- Keys that do not leak user identity or allow guessing
- Metadata in the database, bytes in storage, kept consistent
- Lifecycle: retention, orphans, and cleaning up after a deleted record

### Serving

- Signed, expiring URLs for private files
- CDN and cache headers
- Derivatives: thumbnails and transcodes, and generating them once
- Range requests, so a video can seek

## Levels

| Level | What it looks like |
| --- | --- |
| Junior | Uploads a file through the server and displays it afterwards. |
| Middle | Uploads directly to storage, validates by content, shows progress, and handles failure and cancellation. |
| Senior | Designs the whole path — signing, retention, derivatives, access control, cost — and makes large uploads survive a bad network. |

## Practice

### Starting out

- **Validate for real**
  Rename a text file to `.jpg`, upload it, and make the server reject it.

- **Show progress**
  Add real progress and a working cancel to an upload.

- **Limit the size**
  Reject files over a limit before the whole body has been received.

### Going deeper

- **Bypass your server**
  Move an upload to a signed direct-to-storage URL and compare the load.

- **Resume a broken upload**
  Make a large upload survive losing the connection halfway.

- **Clean up orphans**
  Find stored files whose database records are gone, and stop creating more.

## Check yourself

- Does every uploaded file pass through your server, and does it need to?
- How do you determine what an uploaded file actually is?
- Who can read a stored file if they have the URL?
- What happens to the bytes when a user deletes the record pointing at them?
- What does an upload do when the connection drops at eighty percent?
- What is your storage costing, and what is in it that nothing references?

## Resources

- **[OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)** —
  the attacks and the checks that stop them. Read before writing an upload
  endpoint, not after an incident.
- **[Serverpod: file uploads](https://docs.serverpod.dev/concepts/file-uploads)** —
  signed direct uploads and access control in a Dart backend.
- **[Amazon S3: presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html)** —
  the canonical explanation of the pattern, which every other object store
  copies.
- **[MDN: Range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests)** —
  what makes seeking in a video work, and what your serving layer has to support.
- **[image_picker](https://pub.dev/packages/image_picker)** and
  **[file_picker](https://pub.dev/packages/file_picker)** — the client side, and
  the platform permission behaviour documented in their READMEs.
