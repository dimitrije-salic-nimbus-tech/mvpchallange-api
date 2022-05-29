import { ChangeDepositRequest } from '../dto/request';
import { getUserRepository } from '../../../lib/repositories';
import { ResourceNotFoundException } from '../../../lib/exceptions/shared';

interface IUserDepositService {
  changeDeposit: (id: string, request: ChangeDepositRequest) => Promise<string>;
  resetDeposit: (id: string) => Promise<void>;
}

const changeDeposit = async (id: string, request: ChangeDepositRequest): Promise<string> => {
  const userRepository = await getUserRepository();
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new ResourceNotFoundException();
  }

  const deposit: number = user.deposit + request.deposit;

  return userRepository.update(id, { deposit }).then(() => deposit.toString());
};

const resetDeposit = async (id: string): Promise<void> => {
  const userRepository = await getUserRepository();
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new ResourceNotFoundException();
  }

  return userRepository.update(id, { deposit: 0 }).then(() => Promise.resolve());
};

export const userDepositService: IUserDepositService = {
  changeDeposit,
  resetDeposit,
};
