import { Uuid } from '@core/shared/domain/value-objects/uuid-value-object';
import { setupSequelize } from '@core/shared/infra/helpers/helpers';
import { DataType } from 'sequelize-typescript';
import { ScheduleModel } from '../schedule.model';
import { TasksModel } from '@core/tasks/infra/db/sequelize/model/tasks.model';

describe('ScheduleModel Integration Tests', () => {
  setupSequelize({ models: [ScheduleModel, TasksModel] });

  test('mapping props', () => {
    const attributesMap = ScheduleModel.getAttributes();
    const attributes = Object.keys(ScheduleModel.getAttributes());

    expect(attributes).toStrictEqual([
      'scheduleId',
      'accountId',
      'agentId',
      'startTime',
      'endTime',
      'createdAt',
    ]);

    const scheduleIdAttr = attributesMap.scheduleId;
    expect(scheduleIdAttr).toMatchObject({
      field: 'schedule_id',
      fieldName: 'scheduleId',
      primaryKey: true,
      type: DataType.UUID(),
    });

    const accountIdAttr = attributesMap.accountId;
    expect(accountIdAttr).toMatchObject({
      field: 'account_id',
      fieldName: 'accountId',
      type: DataType.UUID(),
    });

    const agentIdAttr = attributesMap.agentId;
    expect(agentIdAttr).toMatchObject({
      field: 'agent_id',
      fieldName: 'agentId',
      allowNull: true,
      type: DataType.UUID(),
    });

    const startTimeAttr = attributesMap.startTime;
    expect(startTimeAttr).toMatchObject({
      field: 'start_time',
      fieldName: 'startTime',
      allowNull: true,
      type: DataType.DATE(3),
    });

    const endTimeAttr = attributesMap.endTime;
    expect(endTimeAttr).toMatchObject({
      field: 'end_time',
      fieldName: 'endTime',
      allowNull: true,
      type: DataType.DATE(3),
    });

    const createdAtAttr = attributesMap.createdAt;
    expect(createdAtAttr).toMatchObject({
      field: 'created_at',
      fieldName: 'createdAt',
      allowNull: false,
      type: DataType.DATE(3),
    });
  });

  test('should create a schedule', async () => {
    const arrange = {
      scheduleId: new Uuid().id,
      accountId: new Uuid().id,
      agentId: new Uuid().id,
      startTime: new Date(),
      endTime: new Date(),
      createdAt: new Date(),
    };

    const schedule = await ScheduleModel.create(arrange);

    expect(schedule.toJSON()).toStrictEqual(arrange);
  });
});
