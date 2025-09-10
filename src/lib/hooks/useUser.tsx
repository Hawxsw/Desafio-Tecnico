// biome-ignore assist/source/organizeImports: <explanation>
import { useUserStore } from "@/stores/user.store";
import { CreateUserType } from "../user/user.schema";

export const useUser = () => {
    const {
        loading,
        error,
        success,
        createUser,
        resetState
    } = useUserStore();

    const handleCreateUser = (payload: CreateUserType) => {
        createUser(payload);
    };

    const handleResetState = () => {
        resetState();
    };

    return {
        loading,
        error,
        success,
        handleCreateUser,
        handleResetState,
    };
};

