// biome-ignore assist/source/organizeImports: <explanation>
import { useDispatch, useSelector } from "react-redux";
import { createUser, resetState } from "../store/userCreation.slice";
import type { CreateUserType } from "../schemas/user.schema";
import type { RootState, AppDispatch } from "../store";

export const useUser = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loading, error, success } = useSelector((state: RootState) => state.userCreation);

    const handleCreateUser = (payload: CreateUserType) => {
        dispatch(createUser(payload));
    };

    const handleResetState = () => {
        dispatch(resetState());
    };

    return {
        loading,
        error,
        success,
        handleCreateUser,
        handleResetState,
    };
};

