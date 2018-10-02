import {User} from './user.model';

export class CampaignHistory {
  static id_counter = 0;
  constructor(
    public actionType: HistoryActionTypeEnum,
    public actor: User,
    public data: null | string | RenameData = null,
    public timeStamp: number = Date.now(),
    public readonly id: string = 'campaignHistory_' + (++CampaignHistory.id_counter)
  ) {
    // check if the user object is valid
    if (!User.isUserObject(actor)) {
      throw new Error('Invalid user object passed to CampaignHistory');
    }

    switch (actionType) {
      case HistoryActionTypeEnum.CREATE:
      case HistoryActionTypeEnum.DELETE:
      case HistoryActionTypeEnum.PAUSED:
      case HistoryActionTypeEnum.RESUMED:
        if (data) {
          console.warn(
            `Campaign History of Type ${actionType} can not have additional data. Ignoring`
          );
        }
        this.data = null;
        break;
      case HistoryActionTypeEnum.COMMENT:
        if (typeof data !== 'string') {
          console.warn(
            `Campaign History of Type ${actionType} can have only string. Falling back to stringify`
          );
          this.data = data.toString();
        }
        break;
      case HistoryActionTypeEnum.RENAME:
        if (!(data instanceof RenameData)) {
          throw new Error(`data must be instance of RenameData for ${actionType} `);
        }
        break;
      default:
      throw new Error('Invalid action type.');
    }
  }

  static fromObject(obj: Object): CampaignHistory {
    try {
      let data: null | string | RenameData = obj['data'];
      if (obj['actionType'] === HistoryActionTypeEnum.RENAME) {
        data = RenameData.fromObject(data);
      }
      return new CampaignHistory(
        obj['actionType'],
        User.fromObject(obj['actor']),
        data,
        obj['timeStamp'],
        obj['id']
      );
    } catch (e) {
      throw new Error(e);
    }
  }

}


export class RenameData {
  static id_counter = 0;
  constructor(
    public old: string,
    public current: string,
    public readonly id: string = 'renameId_' + (++RenameData.id_counter)
    ) { }

  static fromObject(obj: Object): RenameData {
    if ('id' in obj && 'old' in obj && 'current' in obj) {
      return new RenameData(obj['old'], obj['current'], obj['id']);
    }
    throw new Error('Can not convert provided object to RenameData instance');
  }
}
export enum HistoryActionTypeEnum {
  CREATE = '[HistoryActionType] CREATE',
  COMMENT = '[HistoryActionType] COMMENT',
  RENAME = '[HistoryActionType] RENAME',
  DELETE = '[HistoryActionType] DELETE',
  PAUSED = '[HistoryActionType] PAUSED',
  RESUMED = '[HistoryActionType] RESUMED'
}


