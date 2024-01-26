/*
 * GNU LESSER GENERAL PUBLIC LICENSE
 * Version 3, 29 June 2007
 *
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * The Free Software Foundation may publish revised and/or new versions of the GNU Lesser
 * General Public License from time to time. Such new versions will be similar in spirit to the
 * present version, but may differ in detail to address new problems or concerns.

 * Each version is given a distinguishing version number. If the Library as you received it
 * specifies that a certain numbered version of the GNU Lesser General Public License “or any
 * later version” applies to it, you have the option of following the terms and conditions either
 * of that published version or of any later version published by the Free Software Foundation. If
 * the Library as you received it does not specify a version number of the GNU Lesser General
 * Public License, you may choose any version of the GNU Lesser General Public License ever
 * published by the Free Software Foundation.

 * If the Library as you received it specifies that a proxy can decide whether future versions of
 * the GNU Lesser General Public License shall apply, that proxy's public statement of
 * acceptance of any version is permanent authorization for you to choose that version
 * for the Library.
 */


import MediatypeService from "../service/MediatypeService"
import StringUtil from "../util/StringUtil"
import Author from "./Author"
import Identifier from "./Identifier"
import Date from "./Date"

class Metadata {
    public static readonly DEFAULT_LANGUAGE: string = "en";
    private autoGeneratedId: boolean = true;
    private authors: Array<Author> = new Array<Author>();
    private contributors: Array<Author> = new Array<Author>();
    private dates: Array<Date> = new Array<Date>();
    private language: string = Metadata.DEFAULT_LANGUAGE;
    private otherProperties: Map<string, string> = new Map<string, string>();
    private rights: Array<string> = new Array<string>();
    private titles: Array<string> = new Array<string>();
    private identifiers: Array<Identifier> = new Array<Identifier>();
    private subjects: Array<string> = new Array<string>();
    private format: string = MediatypeService.EPUB.getName();
    private types: Array<string> = new Array<string>();
    private descriptions: Array<string> = new Array<string>();
    private publishers: Array<string> = new Array<string>();
    private metaAttributes: Map<string, string> = new Map<string, string>();

    constructor() {
        this.autoGeneratedId = true;
    }

    public isAutoGeneratedId(): boolean {
        return this.autoGeneratedId;
    }

    /**
   * Metadata properties not hard-coded like the author, title, etc.
   *
   * @return Metadata properties not hard-coded like the author, title, etc.
   */
    public getOtherProperties(): Map<string, string> {
        return this.otherProperties;
    }

    public setOtherProperties(otherProperties: Map<string, string>): void {
        this.otherProperties = otherProperties;
    }

    public addDate(date: Date): Date {
        this.dates.push(date);
        return date;
    }

    public getDates(): Array<Date> {
        return this.dates;
    }

    public setDates(dates: Array<Date>): void {
        this.dates = dates;
    }

    public addAuthor(author: Author): Author {
        this.authors.push(author);
        return author;
    }

    public getAuthors(): Array<Author> {
        return this.authors;
    }

    public setAuthors(authors: Array<Author>): void {
        this.authors = authors;
    }

    public addContributor(contributor: Author): Author {
        this.contributors.push(contributor);
        return contributor;
    }

    public getContributors(): Array<Author> {
        return this.contributors;
    }

    public setContributors(contributors: Array<Author>): void {
        this.contributors = contributors;
    }

    public getLanguage(): string {
        return this.language;
    }

    public setLanguage(language: string): void {
        this.language = language;
    }

    public getSubjects(): Array<string> {
        return this.subjects;
    }

    public setSubjects(subjects: Array<string>): void {
        this.subjects = subjects;
    }

    public setRights(rights: Array<string>): void {
        this.rights = rights;
    }

    public getRights(): Array<string> {
        return this.rights;
    }


    /**
     * Gets the first non-blank title of the book.
     * Will return "" if no title found.
     *
     * @return the first non-blank title of the book.
     */
    public getFirstTitle(): string {
        if (this.titles == null || this.titles.length == 0) {
            return "";
        }
        for (let title of this.titles) {
            if (StringUtil.isNotBlank(title)) {
                return title;
            }
        }
        return "";
    }

    public addTitle(title: string): string {
        this.titles.push(title);
        return title;
    }

    public setTitles(titles: Array<string>): void {
        this.titles = titles;
    }

    public getTitles(): Array<string> {
        return this.titles;
    }

    public addPublisher(publisher: string): string {
        this.publishers.push(publisher);
        return publisher;
    }

    public setPublishers(publishers: Array<string>): void {
        this.publishers = publishers;
    }

    public getPublishers(): Array<string> {
        return this.publishers;
    }

    public addDescription(description: string): string {
        this.descriptions.push(description);
        return description;
    }

    public setDescriptions(descriptions: Array<string>): void {
        this.descriptions = descriptions;
    }

    public getDescriptions(): Array<string> {
        return this.descriptions;
    }

    public addIdentifier(identifier: Identifier): Identifier {
        if (this.autoGeneratedId && (this.identifiers.length != 0)) {
            this.identifiers.splice(0, 0, identifier);
        } else {
            this.identifiers.push(identifier);
        }
        this.autoGeneratedId = false;
        return identifier;
    }

    public setIdentifiers(identifiers: Array<Identifier>): void {
        this.identifiers = identifiers;
        this.autoGeneratedId = false;
    }

    public getIdentifiers(): Array<Identifier> {
        return this.identifiers;
    }

    public setFormat(format: string): void {
        this.format = format;
    }

    public getFormat(): string {
        return this.format;
    }

    public addType(type: string): string {
        this.types.push(type);
        return type;
    }

    public getTypes(): Array<string> {
        return this.types;
    }

    public setTypes(types: Array<string>): void {
        this.types = types;
    }

    public getMetaAttribute(name: string): string {
        return this.metaAttributes.get(name);
    }

    public setMetaAttributes(metaAttributes: Map<string, string>): void {
        this.metaAttributes = metaAttributes;
    }
}

export default Metadata