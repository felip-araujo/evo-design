import { API_URL } from "./ApiUrl";

export const MAX_DEMO_BYTES = 25 * 1024 * 1024;
export const DEMO_ACCEPT = ".gif,.mp4,.webm,image/gif,video/mp4,video/webm";

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

export function projectMediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("/uploads/project-demos/")) {
    return new URL(path, new URL(API_URL, window.location.origin)).href;
  }
  return path;
}
