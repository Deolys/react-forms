import type { JSX } from 'react';
import { Header } from '@/components/header';
import { useAppSelector } from '@/store/hooks';
import { FormTile } from '@/components/form-tile';
import styles from './main-page.module.css';

export function MainPage(): JSX.Element {
  const formsData = useAppSelector((state) => state.forms.forms);
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.formsWrapper}>
        {formsData.length ? (
          formsData.map((form, index) => (
            <FormTile key={form.email + index} formData={form} isLast={index === 0} />
          ))
        ) : (
          <div className={styles.noFormsText}>
            <p>There are no completed forms yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
