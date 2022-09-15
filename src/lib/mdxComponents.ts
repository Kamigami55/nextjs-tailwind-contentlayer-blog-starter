import {
  CustomH1,
  CustomH2,
  CustomH3,
  CustomH4,
  CustomH5,
  CustomH6,
} from '@/components/CustomHeading';
import CustomImage from '@/components/CustomImage';
import CustomLink from '@/components/CustomLink';
import CustomPre from '@/components/CustomPre';

// Custom components/renderers to pass to MDX.
const mdxComponents = {
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  h4: CustomH4,
  h5: CustomH5,
  h6: CustomH6,
  pre: CustomPre,
  a: CustomLink,
  img: CustomImage,
};

export default mdxComponents;
