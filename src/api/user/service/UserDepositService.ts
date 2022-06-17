import { ChangeDepositRequest } from '../dto/request';
import { getUserRepository } from '../../../lib/repositories';
import { ResourceNotFoundException } from '../../../lib/exceptions/shared';
import { UserFullResponse } from '../dto/response';
import { mapUserEntityToUserFullResponse } from '../../../lib/utils/mapper/user/mapUserEntityToUserResponse';

interface IUserDepositService {
  changeDeposit: (id: string, request: ChangeDepositRequest) => Promise<UserFullResponse>;
  resetDeposit: (id: string) => Promise<UserFullResponse>;
}

const changeDeposit = async (id: string, request: ChangeDepositRequest): Promise<UserFullResponse> => {
  const userRepository = await getUserRepository();
  const user = await userRepository.findOne({ where: { id }, relations: ['role'] });

  if (!user) {
    throw new ResourceNotFoundException();
  }

  const deposit: number = user.deposit + request.deposit;

  return userRepository.save({ ...user, deposit }).then(mapUserEntityToUserFullResponse);
};

const resetDeposit = async (id: string): Promise<UserFullResponse> => {
  const userRepository = await getUserRepository();
  const user = await userRepository.findOne({ where: { id }, relations: ['role'] });

  if (!user) {
    throw new ResourceNotFoundException();
  }

  return userRepository.save({ ...user, deposit: 0 }).then(mapUserEntityToUserFullResponse);
};

export const userDepositService: IUserDepositService = {
  changeDeposit,
  resetDeposit,
};
