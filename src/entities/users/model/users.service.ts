import type { ResponseData } from "src/shared/api"
import { api } from "src/shared/api"
import type { Users } from "./users.type"

class UsersService {
	get = async (): Promise<ResponseData<Users>> => {
		const response = await api.get("/admin/users/attempts")
		return response.data
	}
}

export const userService = new UsersService()
