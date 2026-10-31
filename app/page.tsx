import SiteHeader from '@/components/site-header';
import Hero from '@/components/hero';
import PromptGenerator from '@/components/prompt-generator';
import Compatibility from '@/components/compatibility';
import Steps from '@/components/steps';
import Safety from '@/components/safety';
import SiteFooter from '@/components/site-footer';
export default function Home() {
  return <main className="min-h-screen overflow-hidden"><SiteHeader/><Hero/><PromptGenerator/><Compatibility/><Steps/><Safety/><SiteFooter/></main>;
}
