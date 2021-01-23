import { unlink, existsSync } from 'fs';
import { docImageFilter } from './filters.utils';

export const cleaner = (path) => {
  if (existsSync('uploads/' + path)) {
    unlink('uploads/' + path, (err) => {
      if (err) {
        return;
      }
    });
    const webpPath = path.replace(docImageFilter, '.webp');
    if (existsSync('uploads/' + webpPath)) {
      unlink('uploads/' + webpPath, (err) => {
        if (err) {
          return;
        }
      });
    }
  }
};
