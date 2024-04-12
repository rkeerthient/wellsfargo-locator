export enum Type {
	POSTAL_CODE = "Postal Code",
	REGION = "State/Region",
	COUNTY = "County",
	CITY = "City",
	SUBLOCALITY = "Sublocality",
}

export interface ServiceAreaPlaces {
	name?: string,
	type?: Type,
	googlePlaceId?: string,
}

export interface Address {
	line1?: string,
	line2?: string,
	line3?: string,
	sublocality?: string,
	city?: string,
	region?: string,
	postalCode?: string,
	extraDescription?: string,
	countryCode?: string,
}

export interface Interval {
	start: any,
	end: any,
}

export interface DayHour {
	openIntervals?: Interval[],
	isClosed?: boolean,
}

export interface HolidayHours {
	date: string,
	openIntervals?: Interval[],
	isClosed?: boolean,
	isRegularHours?: boolean,
}

export interface Hours {
	monday?: DayHour,
	tuesday?: DayHour,
	wednesday?: DayHour,
	thursday?: DayHour,
	friday?: DayHour,
	saturday?: DayHour,
	sunday?: DayHour,
	holidayHours?: HolidayHours[],
	reopenDate?: string,
}

export interface Coordinate {
	latitude?: number,
	longitude?: number,
}

export enum LinkType {
	OTHER = "Other",
	URL = "URL",
	PHONE = "Phone",
	EMAIL = "Email",
}

export interface C_primaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_secondaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export enum C_typeOfLocation {
	ATM = "ATM",
	MORTGAGE = "Mortgage",
	HMC = "HMC",
	ABBOTTDOWNING = "Abbot Downing",
	FINET = "FiNet",
	PCG = "PCG",
	PRIVATEBANK = "Private Bank",
	COMMUNITYBANK = "Community Bank",
	HISTORYMUSEUMS = "History Museums",
}

export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export default interface Ce_allEntities {
	landingPageUrl?: string,
	richTextDescriptionV2?: any,
	serviceAreaPlaces?: ServiceAreaPlaces[],
	shortDescriptionV2?: any,
	title?: string,
	address?: Address,
	description?: string,
	hours?: Hours,
	name: string,
	cityCoordinate?: Coordinate,
	c_category?: string,
	c_primaryCTA?: C_primaryCTA,
	c_secondaryCTA?: C_secondaryCTA,
	c_typeOfLocation?: C_typeOfLocation[],
	displayCoordinate?: Coordinate,
	dropoffCoordinate?: Coordinate,
	emails?: string[],
	facebookLinkedAccount?: any,
	photoGallery?: ComplexImage[],
	geocodedCoordinate?: Coordinate,
	gmbLinkedAccount?: any,
	instagramLinkedAccount?: any,
	languages?: string[],
	linkedinLinkedAccount?: any,
	mainPhone?: any,
	pickupCoordinate?: Coordinate,
	routableCoordinate?: Coordinate,
	id: string,
	twitterLinkedAccount?: any,
	walkableCoordinate?: Coordinate,
	yextDisplayCoordinate?: Coordinate,
	yextDropoffCoordinate?: Coordinate,
	yextPickupCoordinate?: Coordinate,
	yextRoutableCoordinate?: Coordinate,
	yextWalkableCoordinate?: Coordinate,
}
