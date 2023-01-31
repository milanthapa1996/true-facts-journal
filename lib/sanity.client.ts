import {SanityImageSource} from '@sanity/asset-utils';
import { createClient } from "next-sanity";
import createImageUrlBuilder from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET; 
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION; 

export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'undefined',
	useCdn: process.env.NODE_ENV === 'production',
	apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION
};

export const client = createClient(config);
export const urlForImage = (source: SanityImageSource) => createImageUrlBuilder(config).image(source);