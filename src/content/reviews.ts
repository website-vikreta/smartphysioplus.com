// Fill only with reviews the client has permission to publish. Empty shows the Google reviews button.
export type Review = { author: string; text: string; date: string };
export const reviews: Review[] = [];
