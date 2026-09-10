import {ClientsDirectory} from '../../components/clients-directory';
import {dictionary} from '../../lib/i18n';
import {pageMetadata} from '../../lib/seo';
const d=dictionary('en');
export const metadata=pageMetadata(d.meta.clientsTitle,d.meta.clientsDescription,'/clients','en');
export default function Page(){return <ClientsDirectory locale="en"/>;}
