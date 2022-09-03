import { siteConfigs } from '@/configs/siteConfigs';

export const getPostOGImage = (socialImage: string | null): string => {
  if (!socialImage) {
    return siteConfigs.bannerUrl;
  }
  if (socialImage.startsWith('http')) {
    return socialImage;
  }
  return siteConfigs.fqdn + socialImage;
};
