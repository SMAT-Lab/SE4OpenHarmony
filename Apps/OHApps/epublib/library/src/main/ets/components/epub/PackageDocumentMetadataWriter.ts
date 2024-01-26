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


import DCAttributes from './DCAttributes';
import Identifier from '../domain/Identifier';
import { Constants } from '../Constants';
import OPFValues from './OPFValues';
import EpubWriter from './EpubWriter';
import StringUtil from '../util/StringUtil';
import OPFAttributes from './OPFAttributes';
import DCTags from './DCTags';
import OPFTags from './OPFTags';
import Book from '../domain/Book';
import PackageDocumentBase from './PackageDocumentBase';

class PackageDocumentMetadataWriter extends PackageDocumentBase {

	/**
	 * Writes the book's metadata.
	 *
	 * @param book
	 * @param serializer
	 * @throws IOException
	 * @throws IllegalStateException
	 * @throws IllegalArgumentException
	 */
	public static writeMetaData(book : Book, parentElement:ESObject, document:ESObject) : void  {
		let metadataElement:ESObject = document.createElementNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.metadata);
		metadataElement.setAttribute("xmlns:" + PackageDocumentBase.PREFIX_DUBLIN_CORE, PackageDocumentBase.NAMESPACE_DUBLIN_CORE);
		metadataElement.setAttribute("xmlns:" + PackageDocumentBase.PREFIX_OPF, PackageDocumentBase.NAMESPACE_OPF);

		PackageDocumentMetadataWriter.writeIdentifiers(book.getMetadata().getIdentifiers(), metadataElement, document);
		PackageDocumentMetadataWriter.writeSimpleMetdataElements(DCTags.title, book.getMetadata().getTitles(), metadataElement, document);
		PackageDocumentMetadataWriter.writeSimpleMetdataElements(DCTags.subject, book.getMetadata().getSubjects(), metadataElement, document);
		PackageDocumentMetadataWriter.writeSimpleMetdataElements(DCTags.description, book.getMetadata().getDescriptions(), metadataElement, document);
		PackageDocumentMetadataWriter.writeSimpleMetdataElements(DCTags.publisher, book.getMetadata().getPublishers(), metadataElement, document);
		PackageDocumentMetadataWriter.writeSimpleMetdataElements(DCTags.type, book.getMetadata().getTypes(), metadataElement, document);
		PackageDocumentMetadataWriter.writeSimpleMetdataElements(DCTags.rights, book.getMetadata().getRights(), metadataElement, document);

		// write authors
		for(let author of book.getMetadata().getAuthors()) {
      let creatorElement:ESObject = document.createElementNS(PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.creator);
		  creatorElement.setAttributeNS(PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.role, author.getRelator().getCode());
		  creatorElement.setAttributeNS(PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.file_as, author.getLastname() + ", " + author.getFirstname());
		  creatorElement.textContent = author.getFirstname() + " " + author.getLastname();
		  metadataElement.appendChild(creatorElement);
		}

		// write contributors
		for(let author of book.getMetadata().getContributors()) {
      let contributorElement:ESObject = document.createElementNS(PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.contributor);
		  contributorElement.setAttributeNS(PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.role, author.getRelator().getCode());
		  contributorElement.setAttributeNS(PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.file_as, author.getLastname() + ", " + author.getFirstname());
		  contributorElement.textContent = author.getFirstname() + " " + author.getLastname();
		  metadataElement.appendChild(contributorElement);
		}

		// write dates
		for (let date of book.getMetadata().getDates()) {
      let dateElement:ESObject = document.createElementNS(PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.date);
      if (date.getEvent() != null) {
        dateElement.setAttributeNS(PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.event, date.getEvent().toString());
      }
		  dateElement.textContent = date.getValue();
		  metadataElement.appendChild(dateElement);
		}

		// write language
		if(StringUtil.isNotBlank(book.getMetadata().getLanguage())) {
			let languageElement:ESObject = document.createElementNS(PackageDocumentBase.NAMESPACE_DUBLIN_CORE, "language");
			languageElement.textContent = book.getMetadata().getLanguage();
			metadataElement.appendChild(languageElement);
		}

		// write other properties
		if(book.getMetadata().getOtherProperties() != null) {
			book.getMetadata().getOtherProperties().forEach((value, key)=>{
				let metaElement:ESObject = document.createElementNS(PackageDocumentBase.NAMESPACE_DUBLIN_CORE, OPFTags.meta);
				metaElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.property, key);
				metaElement.textContent = value;
				metadataElement.appendChild(metaElement);
			})
		}

		// write coverimage
		if(book.getCoverImage() != null) { // write the cover image
			let metaElement:ESObject = document.createElementNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.meta);
			metaElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.name, OPFValues.meta_cover);
			metaElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.content, book.getCoverImage().getId());
			metadataElement.appendChild(metaElement);
		}

		// write generator
		let metaElement:ESObject = document.createElementNS(PackageDocumentBase.NAMESPACE_OPF, OPFTags.meta);
		metaElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.name, OPFValues.generator);
		metaElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, OPFAttributes.content, Constants.EPUBLIB_GENERATOR_NAME);
		metadataElement.appendChild(metaElement);

		parentElement.appendChild(metadataElement);
	}

	private static writeSimpleMetdataElements(tagName:string, values:string[], parentElement:ESObject, document:ESObject) : void {
		for(let value of values) {
			if (StringUtil.isBlank(value)) {
				continue;
			}
			let tagElement:ESObject = document.createElementNS(PackageDocumentBase.NAMESPACE_DUBLIN_CORE, tagName);
			tagElement.textContent = value;
			parentElement.appendChild(tagElement);
		}
	}

	/**
	 * Writes out the complete list of Identifiers to the package document.
	 * The first identifier for which the bookId is true is made the bookId identifier.
	 * If no identifier has bookId == true then the first bookId identifier is written as the primary.
	 *
	 * @param identifiers
	 * @param serializer
	 * @throws IOException
	 * @throws IllegalStateException
	 * @throws IllegalArgumentException
	 * @
	 */

	private static writeIdentifiers(identifiers:Identifier[], parentElement:ESObject, document:ESObject) : void {
		let bookIdIdentifier : Identifier = Identifier.getBookIdIdentifier(identifiers);
		if(bookIdIdentifier == null) {
			return;
		}

		let identifierElement:ESObject = document.createElementNS(PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.identifier);
		identifierElement.setAttributeNS(EpubWriter.EMPTY_NAMESPACE_PREFIX, DCAttributes.id, PackageDocumentBase.BOOK_ID_ID);
		identifierElement.setAttributeNS(PackageDocumentBase.NAMESPACE_OPF, OPFAttributes.scheme, bookIdIdentifier.getScheme());
		identifierElement.textContent = bookIdIdentifier.getValue();
		parentElement.appendChild(identifierElement);

		for(let identifier of identifiers.slice(1, identifiers.length)) {
			if(identifier == bookIdIdentifier) {
				continue;
			}
			let tmpElement:ESObject = document.createElementNS(PackageDocumentBase.NAMESPACE_DUBLIN_CORE, DCTags.identifier);
			tmpElement.setAttributeNS(PackageDocumentBase.NAMESPACE_OPF, "scheme", identifier.getScheme());
			tmpElement.textContent = identifier.getValue();
			parentElement.appendChild(tmpElement);
		}
	}

}

export default PackageDocumentMetadataWriter