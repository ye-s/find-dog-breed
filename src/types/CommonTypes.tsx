export enum UserMessages {
  NoMatch = "Not found dog breed",
  Loading = "Loading...",
  Error = "Oops. Please try again, or change image.",
  ModelLoading = "Analyzation Model is loading, please wait."
}

export type UploadedImage = {
  isEmpty: boolean;
  preview?: string;
};
