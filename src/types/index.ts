export interface OrganizationInfo {
  id: string;
  organizationName: string;
  logo?: string;
  isVerified?: boolean;
  organizationType?: string; // used for suggestions display
}

export interface Post {
  id: string;
  organization: OrganizationInfo;
  createdAt: string;
  category: string;
  content: string;
  image?: string;
  raisedAmount: number;
  goalAmount: number;
  supportersCount: number;
  likes: number;
  comments: number;
}
