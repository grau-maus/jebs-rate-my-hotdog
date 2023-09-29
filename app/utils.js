export function fileSizeToKBMB(fileSize) {
  const sizeInKB = (fileSize / 1024).toFixed(2);

  return sizeInKB > 1000
    ? `${(sizeInKB / 1000).toFixed(2)} MB`
    : `${sizeInKB} KB`;
}
