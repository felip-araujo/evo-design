import { API_URL } from "./ApiUrl";

export const MAX_DEMO_BYTES = 25 * 1024 * 1024;
export const DEMO_ACCEPT = ".gif,.mp4,.webm,image/gif,video/mp4,video/webm";
export const MAX_COVER_BYTES = 10 * 1024 * 1024;
export const COVER_ACCEPT = ".png,.jpg,.jpeg,.webp,.gif,image/png,image/jpeg,image/webp,image/gif";

export function coverMimeForFile(file) {
  const mime = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", gif: "image/gif" }[file.name.split(".").pop().toLowerCase()];
  return mime && (!file.type || file.type === mime) ? mime : null;
}

export function demoTypeForFile(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  const formats = {
    gif: { mime: "image/gif", type: "GIF" },
    mp4: { mime: "video/mp4", type: "VIDEO" },
    webm: { mime: "video/webm", type: "VIDEO" },
  };
  const format = formats[extension];
  return format && (!file.type || file.type === format.mime) ? format.type : null;
}

export function projectMediaUrl(path, apiUrl = API_URL) {
  if (!path) return "";
  if (path.startsWith("/uploads/") || path.startsWith("uploads/")) {
    const uploadPath = path.startsWith("/") ? path : `/${path}`;
    return new URL(uploadPath, new URL(apiUrl, window.location.origin)).href;
  }
  return path;
}
