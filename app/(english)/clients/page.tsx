import {ClientsDirectory} from '../../../components/clients-directory';
import {growth} from '../../../content/growth';
import {pageMetadata} from '../../../lib/seo';
export const metadata=pageMetadata('Clients | El Mahdi Bouizmoune',growth('en').clientsDescription,'/clients','en');
export default function Page(){return <ClientsDirectory locale="en"/>;}
