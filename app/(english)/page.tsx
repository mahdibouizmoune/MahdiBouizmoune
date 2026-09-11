import {Home} from '../../components/home';
import {growth} from '../../content/growth';
import {pageMetadata} from '../../lib/seo';
export const metadata=pageMetadata('El Mahdi Bouizmoune | Digital Marketing Manager',growth('en').subline,'/','en');
export default function Page(){return <Home locale="en"/>;}
