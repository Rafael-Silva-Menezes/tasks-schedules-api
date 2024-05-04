import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { ScheduleInput } from '../common/schedule.use-case.mapper.types';

export type UpdateScheduleInputConstructorProps = Omit<
  ScheduleInput,
  'accountId'
> & {
  id: string;
};

export class UpdateScheduleInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  agentId?: string;

  @IsDate()
  @IsOptional()
  startTime?: Date;

  @IsDate()
  @IsOptional()
  endTime?: Date;

  constructor(props: UpdateScheduleInputConstructorProps) {
    if (!props) return;
    this.id = props.id;
    props.agentId && (this.agentId = props.agentId);
    props.startTime && (this.startTime = props.startTime);
    props.endTime && (this.endTime = props.endTime);
  }
}

export class ValidateUpdateScheduleInput {
  static validate(input: UpdateScheduleInput) {
    return validateSync(input);
  }
}