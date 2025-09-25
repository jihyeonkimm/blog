import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date: Date | string | undefined): string => {
  if (!date) return '';
  return format(new Date(date), 'PPP', { locale: ko });
};
