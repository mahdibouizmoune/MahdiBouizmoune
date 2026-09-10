import type {MetadataRoute} from 'next';
import {dictionary,locales,localizePath} from '../lib/i18n';
import {siteUrl,indexable} from '../lib/seo';
export default function sitemap():MetadataRoute.Sitemap{
 if(!indexable)return [];
 const lastModified=new Date(process.env.BUILD_DATE||'2026-09-10');
 return ['/', '/clients',...Object.keys(dictionary('en').work).map(s=>'/work/'+s)].flatMap(path=>locales.map(locale=>({url:siteUrl+localizePath(path,locale),lastModified,alternates:{languages:{en:siteUrl+localizePath(path,'en'),fr:siteUrl+localizePath(path,'fr'),ar:siteUrl+localizePath(path,'ar'),'x-default':siteUrl+localizePath(path,'en')}}})));
}
