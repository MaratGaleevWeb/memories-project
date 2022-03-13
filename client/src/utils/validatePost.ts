export default function validatePost<
  T extends { title: string; message: string; tags: string; selectedFile: string | Blob },
  Errors extends { [P in keyof T]?: string },
>({ title, message, tags, selectedFile }: T): Errors {
  const errors = {} as Errors;

  if (!title || title.length < 2 || title.length > 60) {
    errors.title = 'Length must be greater than 2 characters and less than 60 characters';
  }

  if (!message || message.length < 2 || message.length > 1500) {
    errors.message = 'Length must be greater than 2 characters and less than 1500 characters';
  }

  if (!tags || tags.length < 1 || tags.length > 200) {
    errors.tags = 'There are too many hashtags or they are too long';
  }

  if (!selectedFile) {
    errors.selectedFile = 'There must be a picture';
  }

  return errors;
}
