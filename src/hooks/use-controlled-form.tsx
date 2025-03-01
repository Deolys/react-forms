import { mainPath } from '@/constants/route-paths';
import { userSchema, UserSchema } from '@/models/user';
import { useAppDispatch } from '@/store/hooks';
import { addForm } from '@/store/slices/forms';
import { convertImageToBase64 } from '@/utils/convert-image-to-base64';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface IUseControlledForm {
  register: UseFormRegister<UserSchema>;
  handleSubmit: UseFormHandleSubmit<UserSchema, undefined>;
  errors: FieldErrors<UserSchema>;
  isDirty: boolean;
  isValid: boolean;
  password: string;
  onSubmit: SubmitHandler<UserSchema>;
}

export function useControlledForm(): IUseControlledForm {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm<UserSchema>({
    mode: 'onChange',
    resolver: yupResolver(userSchema),
  });
  const password = watch('password');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserSchema> = async (data) => {
    try {
      if (data.profileImage instanceof File) {
        const profileImage = await convertImageToBase64(data.profileImage);
        dispatch(addForm({ ...data, profileImage }));
        navigate(mainPath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isDirty,
    isValid,
    password,
    onSubmit,
  };
}

export default useControlledForm;
