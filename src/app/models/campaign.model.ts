import {User} from './user.model';
import {CampaignHistory, HistoryActionTypeEnum, RenameData} from './campaign-history.model';

export class Campaign {
  static id_counter = 0;

  static fromObject(obj: Object): Campaign  {
    const historyArr: CampaignHistory[] = (obj['history'] || []).map(u => CampaignHistory.fromObject(u));
    return new Campaign(
      obj['title'],
      User.fromObject(obj['creator']),
      obj['timeStamp'],
      obj['isActive'],
      obj['isArchived'],
      historyArr,
      obj['id'],
    );
  }

  constructor(
    public title: string,
    public creator: User,
    public timeStamp: number = Date.now(),
    public isActive: boolean = true,
    public isArchived: boolean = false,
    public history: CampaignHistory[] = [],
    public readonly id: string = 'campaign_' + (++Campaign.id_counter)
  ) {
    if (!title) {
      throw new Error('title is required. Failed to create Campaign Instance');
    }
    this.validateIfUserIsValidObject(creator);
    if (typeof timeStamp !== 'number') {
      throw new Error('Invalid timestamp. Failed to create Campaign Instance');
    }
    if (typeof isActive !== 'boolean') {
      console.warn('isActive must be boolean. Defaulted to true');
      this.isActive = true;
    }
    if (typeof isArchived !== 'boolean') {
      console.warn('isArchived must be boolean. Defaulted to false');
      this.isArchived = false;
    }
    if (!Array.isArray(history)) {
      console.warn('history in Campaign instance must be a array. Defaulted to empty  array');
      this.history = [];
    }
    if (!history.length) {
      history.push(new CampaignHistory(
        HistoryActionTypeEnum.CREATE,
        this.creator,
        null,
        this.timeStamp
        ));
    }
  }

  public pauseCampaign(user: User) {
    this.validateIfUserIsValidObject(user);
    this.isActive = false;
    this.history.push(new CampaignHistory(
      HistoryActionTypeEnum.PAUSED,
      user,
    ));
  }

  public resumeCampaign(user: User) {
    this.validateIfUserIsValidObject(user);
    this.isActive = true;
    this.history.push(new CampaignHistory(
      HistoryActionTypeEnum.RESUMED,
      user
    ));
  }

  public addComment(comment: string, user: User) {
    this.validateIfUserIsValidObject(user);
    if (!this.isActive) {
      throw new Error('Can not add comment on inactive Campaign');
    }
    this.history.push(new CampaignHistory(
      HistoryActionTypeEnum.COMMENT,
      user,
      comment
    ));
  }

  public renameCampaign(newName: string, user: User = this.creator) {
    this.validateIfUserIsValidObject(user);
    const oldName = this.title;
    this.title = newName;
    this.history.push(new CampaignHistory(
      HistoryActionTypeEnum.RENAME,
      user,
      new RenameData(oldName, newName)
    ));
  }

  public deleteCampaign(user: User) {
    this.validateIfUserIsValidObject(user);
    this.isArchived = true;
    this.history.push(new CampaignHistory(
      HistoryActionTypeEnum.DELETE,
      user
    ));
  }

  private validateIfUserIsValidObject(user: User) {
    if (!User.isUserObject(user)) {
      throw new Error('Please provide a valid user');
    }
  }
}

export type Campaigns = Campaign[];
