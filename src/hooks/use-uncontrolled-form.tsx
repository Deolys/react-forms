import { mainPath } from '@/constants/route-paths';
import { userSchema } from '@/models/user';
import { useAppDispatch } from '@/store/hooks';
import { addForm } from '@/store/slices/forms';
import { convertImageToBase64 } from '@/utils/convert-image-to-base64';
import { type ChangeEvent, type FormEvent, type MutableRefObject, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';

type FormErrors = Record<string, string>;

interface IUseUncontrolledForm {
  errors: FormErrors;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  isDisabled: boolean;
  passwordRef: MutableRefObject<string | undefined>;
}

export function useUncontrolledForm(): IUseUncontrolledForm {
  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const passwordRef = useRef<string | undefined>('');
  const isDisabled = Object.keys(errors).length > 0;
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const field = event.target.name;
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const formData: Record<string, unknown> = Object.fromEntries(form.entries());
    const profileImage = form.get('profileImage');
    formData.terms = form.get('terms')?.toString() === 'on';
    passwordRef.current = form.get('password')?.toString();

    try {
      userSchema.validateSync(formData, { abortEarly: false });
      if (profileImage instanceof File) {
        formData.profileImage = await convertImageToBase64(profileImage);
      }
      dispatch(addForm(formData));
      navigate(mainPath);
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorsData: FormErrors = {};
        error.inner.forEach((item) => {
          if (item.path) {
            errorsData[item.path] = item.message;
          }
        });
        setErrors(errorsData);
      }
    }
  };

  return {
    errors,
    handleInputChange,
    handleSubmit,
    isDisabled,
    passwordRef,
  };
}

export default useUncontrolledForm;
