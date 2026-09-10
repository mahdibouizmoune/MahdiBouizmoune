import {Home} from '../components/home';
import {dictionary} from '../lib/i18n';
import {pageMetadata} from '../lib/seo';
const d=dictionary('en');
export const metadata=pageMetadata(d.meta.homeTitle,d.meta.homeDescription,'/','en');
export default function Page(){return <Home locale="en"/>;}
