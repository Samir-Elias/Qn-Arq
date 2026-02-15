import { track } from "@vercel/analytics";

export function trackProjectView(projectTitle: string) {
  track("project_view", { project: projectTitle });
}

export function trackWhatsAppClick(source: string) {
  track("whatsapp_click", { source });
}

export function trackInstagramClick(source: string) {
  track("instagram_click", { source });
}

export function trackGalleryNavigation(projectTitle: string, imageIndex: number) {
  track("gallery_navigate", { project: projectTitle, image: imageIndex });
}
