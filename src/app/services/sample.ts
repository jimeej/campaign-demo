import { Campaigns, Campaign } from '../models/campaign.model';
import { User } from '../models/user.model';

// User Related
const sampleUsers = [];
sampleUsers.push(new User('User 1'));
sampleUsers.push(new User('User 2'));
sampleUsers.push(new User('User 3'));

function getRandomUser(): User {
  const i = Math.floor(Math.random() * sampleUsers.length);
  if ( i === sampleUsers.length) {
    return sampleUsers[i - 1];
  }
  return sampleUsers[i];
}

// Campaign Related
let campaignCount = 0;
let commentCount = 0;
function addComment(campaign: Campaign) {
  if (Math.random() < 0.5) {
    campaign.addComment('sample comment ' + (++commentCount), getRandomUser());
  }
}

function generateOneCampaign(): Campaign {
  const campaign = new Campaign(
    'sample Campaign ' + (++campaignCount),
    getRandomUser(),
  );
  addComment(campaign);
  if (Math.random() >= 0.5) {
    campaign.pauseCampaign(getRandomUser());
    if (Math.random() >= 0.5) {
      campaign.resumeCampaign(getRandomUser());
      addComment(campaign);
    }
  }

  return campaign;
}

export function getSampleCampaigns(count): Campaigns {
  const campaigns = [];
  for (let i = 0; i < count ; i++) {
    campaigns.push(generateOneCampaign());
  }
  return campaigns;
}
