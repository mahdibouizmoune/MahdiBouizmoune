import {WorkIndex} from '../../../components/work-grid';
import {growth} from '../../../content/growth';
import {pageMetadata} from '../../../lib/seo';
export const metadata=pageMetadata('Work | El Mahdi Bouizmoune',growth('en').workDescription,'/work','en');
export default function Page(){return <WorkIndex/>;}
