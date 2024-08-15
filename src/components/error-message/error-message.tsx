import type { JSX } from 'react';
import styles from './error-message.module.css';

interface ErrorMEssageProps {
  text?: string;
}

export function ErrorMessage({ text }: ErrorMEssageProps): JSX.Element {
  return (
    <div className={styles.errorMessage}>
      <p>{text}</p>
    </div>
  );
}

export default ErrorMessage;
