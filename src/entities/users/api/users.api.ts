import { useCrudQuery } from "src/shared/api"
import { userService } from "../model/users.service"

export const useGetUsersList = () =>
	useCrudQuery({ queryFn: userService.get, queryKey: ["users"] })
