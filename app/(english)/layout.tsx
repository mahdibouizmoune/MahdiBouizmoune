import {Document,documentMetadata} from '../../components/document';
export const metadata=documentMetadata;
export default function Layout({children}:{children:React.ReactNode}){return <Document locale="en">{children}</Document>;}
