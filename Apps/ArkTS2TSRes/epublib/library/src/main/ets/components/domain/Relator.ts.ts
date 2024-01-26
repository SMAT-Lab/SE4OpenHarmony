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
import StringUtil from '../util/StringUtil';
class Relator {
    /**
     * Use for a person or organization who principally exhibits acting skills in a musical or dramatic presentation or entertainment.
     */
    public static readonly ACTOR: Relator = new Relator("act", "Actor");
    /**
     * Use for a person or organization who 1) reworks a musical composition, usually for a different medium, or 2) rewrites novels or stories for motion pictures or other audiovisual medium.
     */
    public static readonly ADAPTER: Relator = new Relator("adp", "Adapter");
    /**
     * Use for a person or organization that reviews, examines and interprets data or information in a specific area.
     */
    public static readonly ANALYST: Relator = new Relator("anl", "Analyst");
    /**
     * Use for a person or organization who draws the two-dimensional figures, manipulates the three dimensional objects and/or also programs the computer to move objects and images for the purpose of animated film processing. Animation cameras, stands, celluloid screens, transparencies and inks are some of the tools of the animator.
     */
    public static readonly ANIMATOR: Relator = new Relator("anm", "Animator");
    /**
     * Use for a person who writes manuscript annotations on a printed item.
     */
    public static readonly ANNOTATOR: Relator = new Relator("ann", "Annotator");
    /**
     * Use for a person or organization responsible for the submission of an application or who is named as eligible for the results of the processing of the application (e.g., bestowing of rights, reward, title, position).
     */
    public static readonly APPLICANT: Relator = new Relator("app", "Applicant");
    /**
     * Use for a person or organization who designs structures or oversees their construction.
     */
    public static readonly ARCHITECT: Relator = new Relator("arc", "Architect");
    /**
     * Use for a person or organization who transcribes a musical composition, usually for a different medium from that of the original; in an arrangement the musical substance remains essentially unchanged.
     */
    public static readonly ARRANGER: Relator = new Relator("arr", "Arranger");
    /**
     * Use for a person (e.g., a painter or sculptor) who makes copies of works of visual art.
     */
    public static readonly ART_COPYIST: Relator = new Relator("acp", "Art copyist");
    /**
     * Use for a person (e.g., a painter) or organization who conceives, and perhaps also implements, an original graphic design or work of art, if specific codes (e.g., [egr], [etr]) are not desired. For book illustrators, prefer Illustrator [ill].
     */
    public static readonly ARTIST: Relator = new Relator("art", "Artist");
    /**
     * Use for a person responsible for controlling the development of the artistic style of an entire production, including the choice of works to be presented and selection of senior production staff.
     */
    public static readonly ARTISTIC_DIRECTOR: Relator = new Relator("ard", "Artistic director");
    /**
     * Use for a person or organization to whom a license for printing or publishing has been transferred.
     */
    public static readonly ASSIGNEE: Relator = new Relator("asg", "Assignee");
    /**
     * Use for a person or organization associated with or found in an item or collection, which cannot be determined to be that of a Former owner [fmo] or other designated relator indicative of provenance.
     */
    public static readonly ASSOCIATED_NAME: Relator = new Relator("asn", "Associated name");
    /**
     * Use for an author, artist, etc., relating him/her to a work for which there is or once was substantial authority for designating that person as author, creator, etc. of the work.
     */
    public static readonly ATTRIBUTED_NAME: Relator = new Relator("att", "Attributed name");
    /**
     * Use for a person or organization in charge of the estimation and public auctioning of goods, particularly books, artistic works, etc.
     */
    public static readonly AUCTIONEER: Relator = new Relator("auc", "Auctioneer");
    /**
     * Use for a person or organization chiefly responsible for the intellectual or artistic content of a work, usually printed text. This term may also be used when more than one person or body bears such responsibility.
     */
    public static readonly AUTHOR: Relator = new Relator("aut", "Author");
    /**
     * Use for a person or organization whose work is largely quoted or extracted in works to which he or she did not contribute directly. Such quotations are found particularly in exhibition catalogs, collections of photographs, etc.
     */
    public static readonly AUTHOR_IN_QUOTATIONS_OR_TEXT_EXTRACTS: Relator = new Relator("aqt", "Author in quotations or text extracts");
    /**
     * Use for a person or organization responsible for an afterword, postface, colophon, etc. but who is not the chief author of a work.
     */
    public static readonly AUTHOR_OF_AFTERWORD_COLOPHON_ETC: Relator = new Relator("aft", "Author of afterword, colophon, etc.");
    /**
     * Use for a person or organization responsible for the dialog or spoken commentary for a screenplay or sound recording.
     */
    public static readonly AUTHOR_OF_DIALOG: Relator = new Relator("aud", "Author of dialog");
    /**
     * Use for a person or organization responsible for an introduction, preface, foreword, or other critical introductory matter, but who is not the chief author.
     */
    public static readonly AUTHOR_OF_INTRODUCTION_ETC: Relator = new Relator("aui", "Author of introduction, etc.");
    /**
     * Use for a person or organization responsible for a motion picture screenplay, dialog, spoken commentary, etc.
     */
    public static readonly AUTHOR_OF_SCREENPLAY_ETC: Relator = new Relator("aus", "Author of screenplay, etc.");
    /**
     * Use for a person or organization responsible for a work upon which the work represented by the catalog record is based. This may be appropriate for adaptations, sequels, continuations, indexes, etc.
     */
    public static readonly BIBLIOGRAPHIC_ANTECEDENT: Relator = new Relator("ant", "Bibliographic antecedent");
    /**
     * Use for a person or organization responsible for the binding of printed or manuscript materials.
     */
    public static readonly BINDER: Relator = new Relator("bnd", "Binder");
    /**
     * Use for a person or organization responsible for the binding design of a book, including the type of binding, the type of materials used, and any decorative aspects of the binding.
     */
    public static readonly BINDING_DESIGNER: Relator = new Relator("bdd", "Binding designer");
    /**
     * Use for the named entity responsible for writing a commendation or testimonial for a work, which appears on or within the publication itself, frequently on the back or dust jacket of print publications or on advertising material for all media.
     */
    public static readonly BLURB_WRITER: Relator = new Relator("blw", "Blurb writer");
    /**
     * Use for a person or organization responsible for the entire graphic design of a book, including arrangement of type and illustration, choice of materials, and process used.
     */
    public static readonly BOOK_DESIGNER: Relator = new Relator("bkd", "Book designer");
    /**
     * Use for a person or organization responsible for the production of books and other print media, if specific codes (e.g., [bkd], [egr], [tyd], [prt]) are not desired.
     */
    public static readonly BOOK_PRODUCER: Relator = new Relator("bkp", "Book producer");
    /**
     * Use for a person or organization responsible for the design of flexible covers designed for or published with a book, including the type of materials used, and any decorative aspects of the bookjacket.
     */
    public static readonly BOOKJACKET_DESIGNER: Relator = new Relator("bjd", "Bookjacket designer");
    /**
     * Use for a person or organization responsible for the design of a book owner's identification label that is most commonly pasted to the inside front cover of a book.
     */
    public static readonly BOOKPLATE_DESIGNER: Relator = new Relator("bpd", "Bookplate designer");
    /**
     * Use for a person or organization who makes books and other bibliographic materials available for purchase. Interest in the materials is primarily lucrative.
     */
    public static readonly BOOKSELLER: Relator = new Relator("bsl", "Bookseller");
    /**
     * Use for a person or organization who writes in an artistic hand, usually as a copyist and or engrosser.
     */
    public static readonly CALLIGRAPHER: Relator = new Relator("cll", "Calligrapher");
    /**
     * Use for a person or organization responsible for the creation of maps and other cartographic materials.
     */
    public static readonly CARTOGRAPHER: Relator = new Relator("ctg", "Cartographer");
    /**
     * Use for a censor, bowdlerizer, expurgator, etc., official or private.
     */
    public static readonly CENSOR: Relator = new Relator("cns", "Censor");
    /**
     * Use for a person or organization who composes or arranges dances or other movements (e.g., "master of swords") for a musical or dramatic presentation or entertainment.
     */
    public static readonly CHOREOGRAPHER: Relator = new Relator("chr", "Choreographer");
    /**
     * Use for a person or organization who is in charge of the images captured for a motion picture film. The cinematographer works under the supervision of a director, and may also be referred to as director of photography. Do not confuse with videographer.
     */
    public static readonly CINEMATOGRAPHER: Relator = new Relator("cng", "Cinematographer");
    /**
     * Use for a person or organization for whom another person or organization is acting.
     */
    public static readonly CLIENT: Relator = new Relator("cli", "Client");
    /**
     * Use for a person or organization that takes a limited part in the elaboration of a work of another person or organization that brings complements (e.g., appendices, notes) to the work.
     */
    public static readonly COLLABORATOR: Relator = new Relator("clb", "Collaborator");
    /**
     * Use for a person or organization who has brought together material from various sources that has been arranged, described, and cataloged as a collection. A collector is neither the creator of the material nor a person to whom manuscripts in the collection may have been addressed.
     */
    public static readonly COLLECTOR: Relator = new Relator("col", "Collector");
    /**
     * Use for a person or organization responsible for the production of photographic prints from film or other colloid that has ink-receptive and ink-repellent surfaces.
     */
    public static readonly COLLOTYPER: Relator = new Relator("clt", "Collotyper");
    /**
     * Use for the named entity responsible for applying color to drawings, prints, photographs, maps, moving images, etc.
     */
    public static readonly COLORIST: Relator = new Relator("clr", "Colorist");
    /**
     * Use for a person or organization who provides interpretation : analysis : or a discussion of the subject matter on a recording : motion picture : or other audiovisual medium.
     */
    public static readonly COMMENTATOR: Relator = new Relator("cmm", "Commentator");
    /**
     * Use for a person or organization responsible for the commentary or explanatory notes about a text. For the writer of manuscript annotations in a printed book : use Annotator [ann].
     */
    public static readonly COMMENTATOR_FOR_WRITTEN_TEXT: Relator = new Relator("cwt", "Commentator for written text");
    /**
     * Use for a person or organization who produces a work or publication by selecting and putting together material from the works of various persons or bodies.
     */
    public static readonly COMPILER: Relator = new Relator("com", "Compiler");
    /**
     * Use for the party who applies to the courts for redress : usually in an equity proceeding.
     */
    public static readonly COMPLAINANT: Relator = new Relator("cpl", "Complainant");
    /**
     * Use for a complainant who takes an appeal from one court or jurisdiction to another to reverse the judgment : usually in an equity proceeding.
     */
    public static readonly COMPLAINANT_APPELLANT: Relator = new Relator("cpt", "Complainant-appellant");
    /**
     * Use for a complainant against whom an appeal is taken from one court or jurisdiction to another to reverse the judgment : usually in an equity proceeding.
     */
    public static readonly COMPLAINANT_APPELLEE: Relator = new Relator("cpe", "Complainant-appellee");
    /**
     * Use for a person or organization who creates a musical work : usually a piece of music in manuscript or printed form.
     */
    public static readonly COMPOSER: Relator = new Relator("cmp", "Composer");
    /**
     * Use for a person or organization responsible for the creation of metal slug : or molds made of other materials : used to produce the text and images in printed matter.
     */
    public static readonly COMPOSITOR: Relator = new Relator("cmt", "Compositor");
    /**
     * Use for a person or organization responsible for the original idea on which a work is based : this includes the scientific author of an audio-visual item and the conceptor of an advertisement.
     */
    public static readonly CONCEPTOR: Relator = new Relator("ccp", "Conceptor");
    /**
     * Use for a person who directs a performing group  = {orchestra : chorus : opera : etc. in a musical or dramatic presentation or entertainment.
     */
    public static readonly CONDUCTOR: Relator = new Relator("cnd", "Conductor");
    /**
     * Use for the named entity responsible for documenting : preserving : or treating printed or manuscript material : works of art : artifacts : or other media.
     */
    public static readonly CONSERVATOR: Relator = new Relator("con", "Conservator");
    /**
     * Use for a person or organization relevant to a resource : who is called upon for professional advice or services in a specialized field of knowledge or training.
     */
    public static readonly CONSULTANT: Relator = new Relator("csl", "Consultant");
    /**
     * Use for a person or organization relevant to a resource : who is engaged specifically to provide an intellectual overview of a strategic or operational task and by analysis : specification : or instruction : to create or propose a cost-effective course of action or solution.
     */
    public static readonly CONSULTANT_TO_A_PROJECT: Relator = new Relator("csp", "Consultant to a project");
    /**
     * Use for the party who opposes : resists : or disputes : in a court of law : a claim : decision : result : etc.
     */
    public static readonly CONTESTANT: Relator = new Relator("cos", "Contestant");
    /**
     * Use for a contestant who takes an appeal from one court of law or jurisdiction to another to reverse the judgment.
     */
    public static readonly CONTESTANT_APPELLANT: Relator = new Relator("cot", "Contestant-appellant");
    /**
     * Use for a contestant against whom an appeal is taken from one court of law or jurisdiction to another to reverse the judgment.
     */
    public static readonly CONTESTANT_APPELLEE: Relator = new Relator("coe", "Contestant-appellee");
    /**
     * Use for the party defending a claim : decision : result : etc. being opposed : resisted : or disputed in a court of law.
     */
    public static readonly CONTESTEE: Relator = new Relator("cts", "Contestee");
    /**
     * Use for a contestee who takes an appeal from one court or jurisdiction to another to reverse the judgment.
     */
    public static readonly CONTESTEE_APPELLANT: Relator = new Relator("ctt", "Contestee-appellant");
    /**
     * Use for a contestee against whom an appeal is taken from one court or jurisdiction to another to reverse the judgment.
     */
    public static readonly CONTESTEE_APPELLEE: Relator = new Relator("cte", "Contestee-appellee");
    /**
     * Use for a person or organization relevant to a resource : who enters into a contract with another person or organization to perform a specific task.
     */
    public static readonly CONTRACTOR: Relator = new Relator("ctr", "Contractor");
    /**
     * Use for a person or organization one whose work has been contributed to a larger work : such as an anthology : serial publication : or other compilation of individual works. Do not use if the sole function in relation to a work is as author : editor : compiler or translator.
     */
    public static readonly CONTRIBUTOR: Relator = new Relator("ctb", "Contributor");
    /**
     * Use for a person or organization listed as a copyright owner at the time of registration. Copyright can be granted or later transferred to another person or organization : at which time the claimant becomes the copyright holder.
     */
    public static readonly COPYRIGHT_CLAIMANT: Relator = new Relator("cpc", "Copyright claimant");
    /**
     * Use for a person or organization to whom copy and legal rights have been granted or transferred for the intellectual content of a work. The copyright holder : although not necessarily the creator of the work : usually has the exclusive right to benefit financially from the sale and use of the work to which the associated copyright protection applies.
     */
    public static readonly COPYRIGHT_HOLDER: Relator = new Relator("cph", "Copyright holder");
    /**
     * Use for a person or organization who is a corrector of manuscripts : such as the scriptorium official who corrected the work of a scribe. For printed matter : use Proofreader.
     */
    public static readonly CORRECTOR: Relator = new Relator("crr", "Corrector");
    /**
     * Use for a person or organization who was either the writer or recipient of a letter or other communication.
     */
    public static readonly CORRESPONDENT: Relator = new Relator("crp", "Correspondent");
    /**
     * Use for a person or organization who designs or makes costumes : fixes hair : etc. : for a musical or dramatic presentation or entertainment.
     */
    public static readonly COSTUME_DESIGNER: Relator = new Relator("cst", "Costume designer");
    /**
     * Use for a person or organization responsible for the graphic design of a book cover : album cover : slipcase : box : container : etc. For a person or organization responsible for the graphic design of an entire book : use Book designer; for book jackets : use Bookjacket designer.
     */
    public static readonly COVER_DESIGNER: Relator = new Relator("cov", "Cover designer");
    /**
     * Use for a person or organization responsible for the intellectual or artistic content of a work.
     */
    public static readonly CREATOR: Relator = new Relator("cre", "Creator");
    /**
     * Use for a person or organization responsible for conceiving and organizing an exhibition.
     */
    public static readonly CURATOR_OF_AN_EXHIBITION: Relator = new Relator("cur", "Curator of an exhibition");
    /**
     * Use for a person or organization who principally exhibits dancing skills in a musical or dramatic presentation or entertainment.
     */
    public static readonly DANCER: Relator = new Relator("dnc", "Dancer");
    /**
     * Use for a person or organization that submits data for inclusion in a database or other collection of data.
     */
    public static readonly DATA_CONTRIBUTOR: Relator = new Relator("dtc", "Data contributor");
    /**
     * Use for a person or organization responsible for managing databases or other data sources.
     */
    public static readonly DATA_MANAGER: Relator = new Relator("dtm", "Data manager");
    /**
     * Use for a person or organization to whom a book : manuscript : etc. : is dedicated  = {not the recipient of a gift.
     */
    public static readonly DEDICATEE: Relator = new Relator("dte", "Dedicatee");
    /**
     * Use for the author of a dedication : which may be a formal statement or in epistolary or verse form.
     */
    public static readonly DEDICATOR: Relator = new Relator("dto", "Dedicator");
    /**
     * Use for the party defending or denying allegations made in a suit and against whom relief or recovery is sought in the courts : usually in a legal action.
     */
    public static readonly DEFENDANT: Relator = new Relator("dfd", "Defendant");
    /**
     * Use for a defendant who takes an appeal from one court or jurisdiction to another to reverse the judgment : usually in a legal action.
     */
    public static readonly DEFENDANT_APPELLANT: Relator = new Relator("dft", "Defendant-appellant");
    /**
     * Use for a defendant against whom an appeal is taken from one court or jurisdiction to another to reverse the judgment : usually in a legal action.
     */
    public static readonly DEFENDANT_APPELLEE: Relator = new Relator("dfe", "Defendant-appellee");
    /**
     * Use for the organization granting a degree for which the thesis or dissertation described was presented.
     */
    public static readonly DEGREE_GRANTOR: Relator = new Relator("dgg", "Degree grantor");
    /**
     * Use for a person or organization executing technical drawings from others' designs.
     */
    public static readonly DELINEATOR: Relator = new Relator("dln", "Delineator");
    /**
     * Use for an entity depicted or portrayed in a work : particularly in a work of art.
     */
    public static readonly DEPICTED: Relator = new Relator("dpc", "Depicted");
    /**
     * Use for a person or organization placing material in the physical custody of a library or repository without transferring the legal title.
     */
    public static readonly DEPOSITOR: Relator = new Relator("dpt", "Depositor");
    /**
     * Use for a person or organization responsible for the design if more specific codes  = {e.g. : [bkd] : [tyd] are not desired.
     */
    public static readonly DESIGNER: Relator = new Relator("dsr", "Designer");
    /**
     * Use for a person or organization who is responsible for the general management of a work or who supervises the production of a performance for stage : screen : or sound recording.
     */
    public static readonly DIRECTOR: Relator = new Relator("drt", "Director");
    /**
     * Use for a person who presents a thesis for a university or higher-level educational degree.
     */
    public static readonly DISSERTANT: Relator = new Relator("dis", "Dissertant");
    /**
     * Use for the name of a place from which a resource : e.g. : a serial : is distributed.
     */
    public static readonly DISTRIBUTION_PLACE: Relator = new Relator("dbp", "Distribution place");
    /**
     * Use for a person or organization that has exclusive or shared marketing rights for an item.
     */
    public static readonly DISTRIBUTOR: Relator = new Relator("dst", "Distributor");
    /**
     * Use for a person or organization who is the donor of a book : manuscript : etc. : to its present owner. Donors to previous owners are designated as Former owner [fmo] or Inscriber [ins].
     */
    public static readonly DONOR: Relator = new Relator("dnr", "Donor");
    /**
     * Use for a person or organization who prepares artistic or technical drawings.
     */
    public static readonly DRAFTSMAN: Relator = new Relator("drm", "Draftsman");
    /**
     * Use for a person or organization to which authorship has been dubiously or incorrectly ascribed.
     */
    public static readonly DUBIOUS_AUTHOR: Relator = new Relator("dub", "Dubious author");
    /**
     * Use for a person or organization who prepares for publication a work not primarily his/her own : such as by elucidating text : adding introductory or other critical matter : or technically directing an editorial staff.
     */
    public static readonly EDITOR: Relator = new Relator("edt", "Editor");
    /**
     * Use for a person responsible for setting up a lighting rig and focusing the lights for a production : and running the lighting at a performance.
     */
    public static readonly ELECTRICIAN: Relator = new Relator("elg", "Electrician");
    /**
     * Use for a person or organization who creates a duplicate printing surface by pressure molding and electrodepositing of metal that is then backed up with lead for printing.
     */
    public static readonly ELECTROTYPER: Relator = new Relator("elt", "Electrotyper");
    /**
     * Use for a person or organization that is responsible for technical planning and design : particularly with construction.
     */
    public static readonly ENGINEER: Relator = new Relator("eng", "Engineer");
    /**
     * Use for a person or organization who cuts letters : figures : etc. on a surface : such as a wooden or metal plate : for printing.
     */
    public static readonly ENGRAVER: Relator = new Relator("egr", "Engraver");
    /**
     * Use for a person or organization who produces text or images for printing by subjecting metal : glass : or some other surface to acid or the corrosive action of some other substance.
     */
    public static readonly ETCHER: Relator = new Relator("etr", "Etcher");
    /**
     * Use for the name of the place where an event such as a conference or a concert took place.
     */
    public static readonly EVENT_PLACE: Relator = new Relator("evp", "Event place");
    /**
     * Use for a person or organization in charge of the description and appraisal of the value of goods : particularly rare items : works of art : etc.
     */
    public static readonly EXPERT: Relator = new Relator("exp", "Expert");
    /**
     * Use for a person or organization that executed the facsimile.
     */
    public static readonly FACSIMILIST: Relator = new Relator("fac", "Facsimilist");
    /**
     * Use for a person or organization that manages or supervises the work done to collect raw data or do research in an actual setting or environment  = {typically applies to the natural and social sciences.
     */
    public static readonly FIELD_DIRECTOR: Relator = new Relator("fld", "Field director");
    /**
     * Use for a person or organization who is an editor of a motion picture film. This term is used regardless of the medium upon which the motion picture is produced or manufactured  = {e.g. : acetate film : video tape.
     */
    public static readonly FILM_EDITOR: Relator = new Relator("flm", "Film editor");
    /**
     * Use for a person or organization who is identified as the only party or the party of the first part. In the case of transfer of right : this is the assignor : transferor : licensor : grantor : etc. Multiple parties can be named jointly as the first party
     */
    public static readonly FIRST_PARTY: Relator = new Relator("fpy", "First party");
    /**
     * Use for a person or organization who makes or imitates something of value or importance : especially with the intent to defraud.
     */
    public static readonly FORGER: Relator = new Relator("frg", "Forger");
    /**
     * Use for a person or organization who owned an item at any time in the past. Includes those to whom the material was once presented. A person or organization giving the item to the present owner is designated as Donor [dnr]
     */
    public static readonly FORMER_OWNER: Relator = new Relator("fmo", "Former owner");
    /**
     * Use for a person or organization that furnished financial support for the production of the work.
     */
    public static readonly FUNDER: Relator = new Relator("fnd", "Funder");
    /**
     * Use for a person responsible for geographic information system  = {GIS development and integration with global positioning system data.
     */
    public static readonly GEOGRAPHIC_INFORMATION_SPECIALIST: Relator = new Relator("gis", "Geographic information specialist");
    /**
     * Use for a person or organization in memory or honor of whom a book : manuscript : etc. is donated.
     */
    public static readonly HONOREE: Relator = new Relator("hnr", "Honoree");
    /**
     * Use for a person who is invited or regularly leads a program  = {often broadcast that includes other guests : performers : etc.  = {e.g. : talk show host.
     */
    public static readonly HOST: Relator = new Relator("hst", "Host");
    /**
     * Use for a person or organization responsible for the decoration of a work  = {especially manuscript material with precious metals or color : usually with elaborate designs and motifs.
     */
    public static readonly ILLUMINATOR: Relator = new Relator("ilu", "Illuminator");
    /**
     * Use for a person or organization who conceives : and perhaps also implements : a design or illustration : usually to accompany a written text.
     */
    public static readonly ILLUSTRATOR: Relator = new Relator("ill", "Illustrator");
    /**
     * Use for a person who signs a presentation statement.
     */
    public static readonly INSCRIBER: Relator = new Relator("ins", "Inscriber");
    /**
     * Use for a person or organization who principally plays an instrument in a musical or dramatic presentation or entertainment.
     */
    public static readonly INSTRUMENTALIST: Relator = new Relator("itr", "Instrumentalist");
    /**
     * Use for a person or organization who is interviewed at a consultation or meeting : usually by a reporter : pollster : or some other information gathering agent.
     */
    public static readonly INTERVIEWEE: Relator = new Relator("ive", "Interviewee");
    /**
     * Use for a person or organization who acts as a reporter : pollster : or other information gathering agent in a consultation or meeting involving one or more individuals.
     */
    public static readonly INTERVIEWER: Relator = new Relator("ivr", "Interviewer");
    /**
     * Use for a person or organization who first produces a particular useful item : or develops a new process for obtaining a known item or result.
     */
    public static readonly INVENTOR: Relator = new Relator("inv", "Inventor");
    /**
     * Use for an institution that provides scientific analyses of material samples.
     */
    public static readonly LABORATORY: Relator = new Relator("lbr", "Laboratory");
    /**
     * Use for a person or organization that manages or supervises work done in a controlled setting or environment.
     */
    public static readonly LABORATORY_DIRECTOR: Relator = new Relator("ldr", "Laboratory director");
    /**
     * Use for a person or organization whose work involves coordinating the arrangement of existing and proposed land features and structures.
     */
    public static readonly LANDSCAPE_ARCHITECT: Relator = new Relator("lsa", "Landscape architect");
    /**
     * Use to indicate that a person or organization takes primary responsibility for a particular activity or endeavor. Use with another relator term or code to show the greater importance this person or organization has regarding that particular role. If more than one relator is assigned to a heading : use the Lead relator only if it applies to all the relators.
     */
    public static readonly LEAD: Relator = new Relator("led", "Lead");
    /**
     * Use for a person or organization permitting the temporary use of a book : manuscript : etc. : such as for photocopying or microfilming.
     */
    public static readonly LENDER: Relator = new Relator("len", "Lender");
    /**
     * Use for the party who files a libel in an ecclesiastical or admiralty case.
     */
    public static readonly LIBELANT: Relator = new Relator("lil", "Libelant");
    /**
     * Use for a libelant who takes an appeal from one ecclesiastical court or admiralty to another to reverse the judgment.
     */
    public static readonly LIBELANT_APPELLANT: Relator = new Relator("lit", "Libelant-appellant");
    /**
     * Use for a libelant against whom an appeal is taken from one ecclesiastical court or admiralty to another to reverse the judgment.
     */
    public static readonly LIBELANT_APPELLEE: Relator = new Relator("lie", "Libelant-appellee");
    /**
     * Use for a party against whom a libel has been filed in an ecclesiastical court or admiralty.
     */
    public static readonly LIBELEE: Relator = new Relator("lel", "Libelee");
    /**
     * Use for a libelee who takes an appeal from one ecclesiastical court or admiralty to another to reverse the judgment.
     */
    public static readonly LIBELEE_APPELLANT: Relator = new Relator("let", "Libelee-appellant");
    /**
     * Use for a libelee against whom an appeal is taken from one ecclesiastical court or admiralty to another to reverse the judgment.
     */
    public static readonly LIBELEE_APPELLEE: Relator = new Relator("lee", "Libelee-appellee");
    /**
     * Use for a person or organization who is a writer of the text of an opera : oratorio : etc.
     */
    public static readonly LIBRETTIST: Relator = new Relator("lbt", "Librettist");
    /**
     * Use for a person or organization who is an original recipient of the right to print or publish.
     */
    public static readonly LICENSEE: Relator = new Relator("lse", "Licensee");
    /**
     * Use for person or organization who is a signer of the license : imprimatur : etc.
     */
    public static readonly LICENSOR: Relator = new Relator("lso", "Licensor");
    /**
     * Use for a person or organization who designs the lighting scheme for a theatrical presentation : entertainment : motion picture : etc.
     */
    public static readonly LIGHTING_DESIGNER: Relator = new Relator("lgd", "Lighting designer");
    /**
     * Use for a person or organization who prepares the stone or plate for lithographic printing : including a graphic artist creating a design directly on the surface from which printing will be done.
     */
    public static readonly LITHOGRAPHER: Relator = new Relator("ltg", "Lithographer");
    /**
     * Use for a person or organization who is a writer of the text of a song.
     */
    public static readonly LYRICIST: Relator = new Relator("lyr", "Lyricist");
    /**
     * Use for a person or organization that makes an artifactual work  = {an object made or modified by one or more persons. Examples of artifactual works include vases : cannons or pieces of furniture.
     */
    public static readonly MANUFACTURER: Relator = new Relator("mfr", "Manufacturer");
    /**
     * Use for the named entity responsible for marbling paper : cloth : leather : etc. used in construction of a resource.
     */
    public static readonly MARBLER: Relator = new Relator("mrb", "Marbler");
    /**
     * Use for a person or organization performing the coding of SGML : HTML : or XML markup of metadata : text : etc.
     */
    public static readonly MARKUP_EDITOR: Relator = new Relator("mrk", "Markup editor");
    /**
     * Use for a person or organization primarily responsible for compiling and maintaining the original description of a metadata set  = {e.g. : geospatial metadata set.
     */
    public static readonly METADATA_CONTACT: Relator = new Relator("mdc", "Metadata contact");
    /**
     * Use for a person or organization responsible for decorations : illustrations : letters : etc. cut on a metal surface for printing or decoration.
     */
    public static readonly METAL_ENGRAVER: Relator = new Relator("mte", "Metal-engraver");
    /**
     * Use for a person who leads a program  = {often broadcast where topics are discussed : usually with participation of experts in fields related to the discussion.
     */
    public static readonly MODERATOR: Relator = new Relator("mod", "Moderator");
    /**
     * Use for a person or organization that supervises compliance with the contract and is responsible for the report and controls its distribution. Sometimes referred to as the grantee : or controlling agency.
     */
    public static readonly MONITOR: Relator = new Relator("mon", "Monitor");
    /**
     * Use for a person who transcribes or copies musical notation
     */
    public static readonly MUSIC_COPYIST: Relator = new Relator("mcp", "Music copyist");
    /**
     * Use for a person responsible for basic music decisions about a production : including coordinating the work of the composer : the sound editor : and sound mixers : selecting musicians : and organizing and/or conducting sound for rehearsals and performances.
     */
    public static readonly MUSICAL_DIRECTOR: Relator = new Relator("msd", "Musical director");
    /**
     * Use for a person or organization who performs music or contributes to the musical content of a work when it is not possible or desirable to identify the function more precisely.
     */
    public static readonly MUSICIAN: Relator = new Relator("mus", "Musician");
    /**
     * Use for a person who is a speaker relating the particulars of an act : occurrence : or course of events.
     */
    public static readonly NARRATOR: Relator = new Relator("nrt", "Narrator");
    /**
     * Use for a person or organization responsible for opposing a thesis or dissertation.
     */
    public static readonly OPPONENT: Relator = new Relator("opn", "Opponent");
    /**
     * Use for a person or organization responsible for organizing a meeting for which an item is the report or proceedings.
     */
    public static readonly ORGANIZER_OF_MEETING: Relator = new Relator("orm", "Organizer of meeting");
    /**
     * Use for a person or organization performing the work : i.e. : the name of a person or organization associated with the intellectual content of the work. This category does not include the publisher or personal affiliation : or sponsor except where it is also the corporate author.
     */
    public static readonly ORIGINATOR: Relator = new Relator("org", "Originator");
    /**
     * Use for relator codes from other lists which have no equivalent in the MARC list or for terms which have not been assigned a code.
     */
    public static readonly OTHER: Relator = new Relator("oth", "Other");
    /**
     * Use for a person or organization that currently owns an item or collection.
     */
    public static readonly OWNER: Relator = new Relator("own", "Owner");
    /**
     * Use for a person or organization responsible for the production of paper : usually from wood : cloth : or other fibrous material.
     */
    public static readonly PAPERMAKER: Relator = new Relator("ppm", "Papermaker");
    /**
     * Use for a person or organization that applied for a patent.
     */
    public static readonly PATENT_APPLICANT: Relator = new Relator("pta", "Patent applicant");
    /**
     * Use for a person or organization that was granted the patent referred to by the item.
     */
    public static readonly PATENT_HOLDER: Relator = new Relator("pth", "Patent holder");
    /**
     * Use for a person or organization responsible for commissioning a work. Usually a patron uses his or her means or influence to support the work of artists : writers : etc. This includes those who commission and pay for individual works.
     */
    public static readonly PATRON: Relator = new Relator("pat", "Patron");
    /**
     * Use for a person or organization who exhibits musical or acting skills in a musical or dramatic presentation or entertainment : if specific codes for those functions  = {[act] : [dnc] : [itr] : [voc] : etc. are not used. If specific codes are used : [prf] is used for a person whose principal skill is not known or specified.
     */
    public static readonly PERFORMER: Relator = new Relator("prf", "Performer");
    /**
     * Use for an authority  = {usually a government agency that issues permits under which work is accomplished.
     */
    public static readonly PERMITTING_AGENCY: Relator = new Relator("pma", "Permitting agency");
    /**
     * Use for a person or organization responsible for taking photographs : whether they are used in their original form or as reproductions.
     */
    public static readonly PHOTOGRAPHER: Relator = new Relator("pht", "Photographer");
    /**
     * Use for the party who complains or sues in court in a personal action : usually in a legal proceeding.
     */
    public static readonly PLAINTIFF: Relator = new Relator("ptf", "Plaintiff");
    /**
     * Use for a plaintiff who takes an appeal from one court or jurisdiction to another to reverse the judgment : usually in a legal proceeding.
     */
    public static readonly PLAINTIFF_APPELLANT: Relator = new Relator("ptt", "Plaintiff-appellant");
    /**
     * Use for a plaintiff against whom an appeal is taken from one court or jurisdiction to another to reverse the judgment : usually in a legal proceeding.
     */
    public static readonly PLAINTIFF_APPELLEE: Relator = new Relator("pte", "Plaintiff-appellee");
    /**
     * Use for a person or organization responsible for the production of plates : usually for the production of printed images and/or text.
     */
    public static readonly PLATEMAKER: Relator = new Relator("plt", "Platemaker");
    /**
     * Use for a person or organization who prints texts : whether from type or plates.
     */
    public static readonly PRINTER: Relator = new Relator("prt", "Printer");
    /**
     * Use for a person or organization who prints illustrations from plates.
     */
    public static readonly PRINTER_OF_PLATES: Relator = new Relator("pop", "Printer of plates");
    /**
     * Use for a person or organization who makes a relief : intaglio : or planographic printing surface.
     */
    public static readonly PRINTMAKER: Relator = new Relator("prm", "Printmaker");
    /**
     * Use for a person or organization primarily responsible for performing or initiating a process : such as is done with the collection of metadata sets.
     */
    public static readonly PROCESS_CONTACT: Relator = new Relator("prc", "Process contact");
    /**
     * Use for a person or organization responsible for the making of a motion picture : including business aspects : management of the productions : and the commercial success of the work.
     */
    public static readonly PRODUCER: Relator = new Relator("pro", "Producer");
    /**
     * Use for a person responsible for all technical and business matters in a production.
     */
    public static readonly PRODUCTION_MANAGER: Relator = new Relator("pmn", "Production manager");
    /**
     * Use for a person or organization associated with the production  = {props : lighting : special effects : etc. of a musical or dramatic presentation or entertainment.
     */
    public static readonly PRODUCTION_PERSONNEL: Relator = new Relator("prd", "Production personnel");
    /**
     * Use for a person or organization responsible for the creation and/or maintenance of computer program design documents : source code : and machine-executable digital files and supporting documentation.
     */
    public static readonly PROGRAMMER: Relator = new Relator("prg", "Programmer");
    /**
     * Use for a person or organization with primary responsibility for all essential aspects of a project : or that manages a very large project that demands senior level responsibility : or that has overall responsibility for managing projects : or provides overall direction to a project manager.
     */
    public static readonly PROJECT_DIRECTOR: Relator = new Relator("pdr", "Project director");
    /**
     * Use for a person who corrects printed matter. For manuscripts : use Corrector [crr].
     */
    public static readonly PROOFREADER: Relator = new Relator("pfr", "Proofreader");
    /**
     * Use for the name of the place where a resource is published.
     */
    public static readonly PUBLICATION_PLACE: Relator = new Relator("pup", "Publication place");
    /**
     * Use for a person or organization that makes printed matter : often text : but also printed music : artwork : etc. available to the public.
     */
    public static readonly PUBLISHER: Relator = new Relator("pbl", "Publisher");
    /**
     * Use for a person or organization who presides over the elaboration of a collective work to ensure its coherence or continuity. This includes editors-in-chief : literary editors : editors of series : etc.
     */
    public static readonly PUBLISHING_DIRECTOR: Relator = new Relator("pbd", "Publishing director");
    /**
     * Use for a person or organization who manipulates : controls : or directs puppets or marionettes in a musical or dramatic presentation or entertainment.
     */
    public static readonly PUPPETEER: Relator = new Relator("ppt", "Puppeteer");
    /**
     * Use for a person or organization to whom correspondence is addressed.
     */
    public static readonly RECIPIENT: Relator = new Relator("rcp", "Recipient");
    /**
     * Use for a person or organization who supervises the technical aspects of a sound or video recording session.
     */
    public static readonly RECORDING_ENGINEER: Relator = new Relator("rce", "Recording engineer");
    /**
     * Use for a person or organization who writes or develops the framework for an item without being intellectually responsible for its content.
     */
    public static readonly REDACTOR: Relator = new Relator("red", "Redactor");
    /**
     * Use for a person or organization who prepares drawings of architectural designs  = {i.e. : renderings in accurate : representational perspective to show what the project will look like when completed.
     */
    public static readonly RENDERER: Relator = new Relator("ren", "Renderer");
    /**
     * Use for a person or organization who writes or presents reports of news or current events on air or in print.
     */
    public static readonly REPORTER: Relator = new Relator("rpt", "Reporter");
    /**
     * Use for an agency that hosts data or material culture objects and provides services to promote long term : consistent and shared use of those data or objects.
     */
    public static readonly REPOSITORY: Relator = new Relator("rps", "Repository");
    /**
     * Use for a person who directed or managed a research project.
     */
    public static readonly RESEARCH_TEAM_HEAD: Relator = new Relator("rth", "Research team head");
    /**
     * Use for a person who participated in a research project but whose role did not involve direction or management of it.
     */
    public static readonly RESEARCH_TEAM_MEMBER: Relator = new Relator("rtm", "Research team member");
    /**
     * Use for a person or organization responsible for performing research.
     */
    public static readonly RESEARCHER: Relator = new Relator("res", "Researcher");
    /**
     * Use for the party who makes an answer to the courts pursuant to an application for redress : usually in an equity proceeding.
     */
    public static readonly RESPONDENT: Relator = new Relator("rsp", "Respondent");
    /**
     * Use for a respondent who takes an appeal from one court or jurisdiction to another to reverse the judgment : usually in an equity proceeding.
     */
    public static readonly RESPONDENT_APPELLANT: Relator = new Relator("rst", "Respondent-appellant");
    /**
     * Use for a respondent against whom an appeal is taken from one court or jurisdiction to another to reverse the judgment : usually in an equity proceeding.
     */
    public static readonly RESPONDENT_APPELLEE: Relator = new Relator("rse", "Respondent-appellee");
    /**
     * Use for a person or organization legally responsible for the content of the published material.
     */
    public static readonly RESPONSIBLE_PARTY: Relator = new Relator("rpy", "Responsible party");
    /**
     * Use for a person or organization : other than the original choreographer or director : responsible for restaging a choreographic or dramatic work and who contributes minimal new content.
     */
    public static readonly RESTAGER: Relator = new Relator("rsg", "Restager");
    /**
     * Use for a person or organization responsible for the review of a book : motion picture : performance : etc.
     */
    public static readonly REVIEWER: Relator = new Relator("rev", "Reviewer");
    /**
     * Use for a person or organization responsible for parts of a work : often headings or opening parts of a manuscript : that appear in a distinctive color : usually red.
     */
    public static readonly RUBRICATOR: Relator = new Relator("rbr", "Rubricator");
    /**
     * Use for a person or organization who is the author of a motion picture screenplay.
     */
    public static readonly SCENARIST: Relator = new Relator("sce", "Scenarist");
    /**
     * Use for a person or organization who brings scientific : pedagogical : or historical competence to the conception and realization on a work : particularly in the case of audio-visual items.
     */
    public static readonly SCIENTIFIC_ADVISOR: Relator = new Relator("sad", "Scientific advisor");
    /**
     * Use for a person who is an amanuensis and for a writer of manuscripts proper. For a person who makes pen-facsimiles : use Facsimilist [fac].
     */
    public static readonly SCRIBE: Relator = new Relator("scr", "Scribe");
    /**
     * Use for a person or organization who models or carves figures that are three-dimensional representations.
     */
    public static readonly SCULPTOR: Relator = new Relator("scl", "Sculptor");
    /**
     * Use for a person or organization who is identified as the party of the second part. In the case of transfer of right : this is the assignee : transferee : licensee : grantee : etc. Multiple parties can be named jointly as the second party.
     */
    public static readonly SECOND_PARTY: Relator = new Relator("spy", "Second party");
    /**
     * Use for a person or organization who is a recorder : redactor : or other person responsible for expressing the views of a organization.
     */
    public static readonly SECRETARY: Relator = new Relator("sec", "Secretary");
    /**
     * Use for a person or organization who translates the rough sketches of the art director into actual architectural structures for a theatrical presentation : entertainment : motion picture : etc. Set designers draw the detailed guides and specifications for building the set.
     */
    public static readonly SET_DESIGNER: Relator = new Relator("std", "Set designer");
    /**
     * Use for a person whose signature appears without a presentation or other statement indicative of provenance. When there is a presentation statement : use Inscriber [ins].
     */
    public static readonly SIGNER: Relator = new Relator("sgn", "Signer");
    /**
     * Use for a person or organization who uses his/her/their voice with or without instrumental accompaniment to produce music. A performance may or may not include actual words.
     */
    public static readonly SINGER: Relator = new Relator("sng", "Singer");
    /**
     * Use for a person who produces and reproduces the sound score  = {both live and recorded : the installation of microphones : the setting of sound levels : and the coordination of sources of sound for a production.
     */
    public static readonly SOUND_DESIGNER: Relator = new Relator("sds", "Sound designer");
    /**
     * Use for a person who participates in a program  = {often broadcast and makes a formalized contribution or presentation generally prepared in advance.
     */
    public static readonly SPEAKER: Relator = new Relator("spk", "Speaker");
    /**
     * Use for a person or organization that issued a contract or under the auspices of which a work has been written : printed : published : etc.
     */
    public static readonly SPONSOR: Relator = new Relator("spn", "Sponsor");
    /**
     * Use for a person who is in charge of everything that occurs on a performance stage : and who acts as chief of all crews and assistant to a director during rehearsals.
     */
    public static readonly STAGE_MANAGER: Relator = new Relator("stm", "Stage manager");
    /**
     * Use for an organization responsible for the development or enforcement of a standard.
     */
    public static readonly STANDARDS_BODY: Relator = new Relator("stn", "Standards body");
    /**
     * Use for a person or organization who creates a new plate for printing by molding or copying another printing surface.
     */
    public static readonly STEREOTYPER: Relator = new Relator("str", "Stereotyper");
    /**
     * Use for a person relaying a story with creative and/or theatrical interpretation.
     */
    public static readonly STORYTELLER: Relator = new Relator("stl", "Storyteller");
    /**
     * Use for a person or organization that supports  = {by allocating facilities : staff : or other resources a project : program : meeting : event : data objects : material culture objects : or other entities capable of support.
     */
    public static readonly SUPPORTING_HOST: Relator = new Relator("sht", "Supporting host");
    /**
     * Use for a person or organization who does measurements of tracts of land : etc. to determine location : forms : and boundaries.
     */
    public static readonly SURVEYOR: Relator = new Relator("srv", "Surveyor");
    /**
     * Use for a person who : in the context of a resource : gives instruction in an intellectual subject or demonstrates while teaching physical skills.
     */
    public static readonly TEACHER: Relator = new Relator("tch", "Teacher");
    /**
     * Use for a person who is ultimately in charge of scenery : props : lights and sound for a production.
     */
    public static readonly TECHNICAL_DIRECTOR: Relator = new Relator("tcd", "Technical director");
    /**
     * Use for a person under whose supervision a degree candidate develops and presents a thesis : mémoire : or text of a dissertation.
     */
    public static readonly THESIS_ADVISOR: Relator = new Relator("ths", "Thesis advisor");
    /**
     * Use for a person who prepares a handwritten or typewritten copy from original material : including from dictated or orally recorded material. For makers of pen-facsimiles : use Facsimilist [fac].
     */
    public static readonly TRANSCRIBER: Relator = new Relator("trc", "Transcriber");
    /**
     * Use for a person or organization who renders a text from one language into another : or from an older form of a language into the modern form.
     */
    public static readonly TRANSLATOR: Relator = new Relator("trl", "Translator");
    /**
     * Use for a person or organization who designed the type face used in a particular item.
     */
    public static readonly TYPE_DESIGNER: Relator = new Relator("tyd", "Type designer");
    /**
     * Use for a person or organization primarily responsible for choice and arrangement of type used in an item. If the typographer is also responsible for other aspects of the graphic design of a book  = {e.g. : Book designer [bkd] : codes for both functions may be needed.
     */
    public static readonly TYPOGRAPHER: Relator = new Relator("tyg", "Typographer");
    /**
     * Use for the name of a place where a university that is associated with a resource is located : for example : a university where an academic dissertation or thesis was presented.
     */
    public static readonly UNIVERSITY_PLACE: Relator = new Relator("uvp", "University place");
    /**
     * Use for a person or organization in charge of a video production : e.g. the video recording of a stage production as opposed to a commercial motion picture. The videographer may be the camera operator or may supervise one or more camera operators. Do not confuse with cinematographer.
     */
    public static readonly VIDEOGRAPHER: Relator = new Relator("vdg", "Videographer");
    /**
     * Use for a person or organization who principally exhibits singing skills in a musical or dramatic presentation or entertainment.
     */
    public static readonly VOCALIST: Relator = new Relator("voc", "Vocalist");
    /**
     * Use for a person who verifies the truthfulness of an event or action.
     */
    public static readonly WITNESS: Relator = new Relator("wit", "Witness");
    /**
     * Use for a person or organization who makes prints by cutting the image in relief on the end-grain of a wood block.
     */
    public static readonly WOOD_ENGRAVER: Relator = new Relator("wde", "Wood-engraver");
    /**
     * Use for a person or organization who makes prints by cutting the image in relief on the plank side of a wood block.
     */
    public static readonly WOODCUTTER: Relator = new Relator("wdc", "Woodcutter");
    /**
     * Use for a person or organization who writes significant material which accompanies a sound recording or other audiovisual material.
     */
    public static readonly WRITER_OF_ACCOMPANYING_MATERIAL: Relator = new Relator("wam", "Writer of accompanying material");
    public static relators: Relator[] = [
        Relator.ACTOR, Relator.ADAPTER, Relator.ANALYST, Relator.ANIMATOR, Relator.ANNOTATOR,
        Relator.APPLICANT, Relator.ARCHITECT, Relator.ARRANGER, Relator.ART_COPYIST, Relator.ARTIST,
        Relator.ARTISTIC_DIRECTOR, Relator.ASSIGNEE, Relator.ASSOCIATED_NAME, Relator.ATTRIBUTED_NAME, Relator.AUCTIONEER,
        Relator.AUTHOR, Relator.AUTHOR_IN_QUOTATIONS_OR_TEXT_EXTRACTS, Relator.AUTHOR_OF_AFTERWORD_COLOPHON_ETC, Relator.AUTHOR_OF_DIALOG, Relator.AUTHOR_OF_INTRODUCTION_ETC,
        Relator.AUTHOR_OF_SCREENPLAY_ETC, Relator.BIBLIOGRAPHIC_ANTECEDENT, Relator.BINDER, Relator.BINDING_DESIGNER, Relator.BLURB_WRITER,
        Relator.BOOK_DESIGNER, Relator.BOOK_PRODUCER, Relator.BOOKJACKET_DESIGNER, Relator.BOOKPLATE_DESIGNER, Relator.BOOKSELLER,
        Relator.CALLIGRAPHER, Relator.CARTOGRAPHER, Relator.CENSOR, Relator.CHOREOGRAPHER, Relator.CINEMATOGRAPHER,
        Relator.CLIENT, Relator.COLLABORATOR, Relator.COLLECTOR, Relator.COLLOTYPER, Relator.COLORIST,
        Relator.COMMENTATOR, Relator.COMMENTATOR_FOR_WRITTEN_TEXT, Relator.COMPILER, Relator.COMPLAINANT, Relator.COMPLAINANT_APPELLANT,
        Relator.COMPLAINANT_APPELLEE, Relator.COMPOSER, Relator.COMPOSITOR, Relator.CONCEPTOR, Relator.CONDUCTOR,
        Relator.CONSERVATOR, Relator.CONSULTANT, Relator.CONSULTANT_TO_A_PROJECT, Relator.CONTESTANT, Relator.CONTESTANT_APPELLANT,
        Relator.CONTESTANT_APPELLEE, Relator.CONTESTEE, Relator.CONTESTEE_APPELLANT, Relator.CONTESTEE_APPELLEE, Relator.CONTRACTOR,
        Relator.CONTRIBUTOR, Relator.COPYRIGHT_CLAIMANT, Relator.COPYRIGHT_HOLDER, Relator.CORRECTOR, Relator.CORRESPONDENT,
        Relator.COSTUME_DESIGNER, Relator.COVER_DESIGNER, Relator.CREATOR, Relator.CURATOR_OF_AN_EXHIBITION, Relator.DANCER,
        Relator.DATA_CONTRIBUTOR, Relator.DATA_MANAGER, Relator.DEDICATEE, Relator.DEDICATOR, Relator.DEFENDANT,
        Relator.DEFENDANT_APPELLANT, Relator.DEFENDANT_APPELLEE, Relator.DEGREE_GRANTOR, Relator.DELINEATOR, Relator.DEPICTED,
        Relator.DEPOSITOR, Relator.DESIGNER, Relator.DIRECTOR, Relator.DISSERTANT, Relator.DISTRIBUTION_PLACE,
        Relator.DISTRIBUTOR, Relator.DONOR, Relator.DRAFTSMAN, Relator.DUBIOUS_AUTHOR, Relator.EDITOR,
        Relator.ELECTRICIAN, Relator.ELECTROTYPER, Relator.ENGINEER, Relator.ENGRAVER, Relator.ETCHER,
        Relator.EVENT_PLACE, Relator.EXPERT, Relator.FACSIMILIST, Relator.FIELD_DIRECTOR, Relator.FILM_EDITOR,
        Relator.FIRST_PARTY, Relator.FORGER, Relator.FORMER_OWNER, Relator.FUNDER, Relator.GEOGRAPHIC_INFORMATION_SPECIALIST,
        Relator.HONOREE, Relator.HOST, Relator.ILLUMINATOR, Relator.ILLUSTRATOR, Relator.INSCRIBER,
        Relator.INSTRUMENTALIST, Relator.INTERVIEWEE, Relator.INTERVIEWER, Relator.INVENTOR, Relator.LABORATORY,
        Relator.LABORATORY_DIRECTOR, Relator.LANDSCAPE_ARCHITECT, Relator.LEAD, Relator.LENDER, Relator.LIBELANT,
        Relator.LIBELANT_APPELLANT, Relator.LIBELANT_APPELLEE, Relator.LIBELEE, Relator.LIBELEE_APPELLANT, Relator.LIBELEE_APPELLEE,
        Relator.LIBRETTIST, Relator.LICENSEE, Relator.LICENSOR, Relator.LIGHTING_DESIGNER, Relator.LITHOGRAPHER,
        Relator.LYRICIST, Relator.MANUFACTURER, Relator.MARBLER, Relator.MARKUP_EDITOR, Relator.METADATA_CONTACT,
        Relator.METAL_ENGRAVER, Relator.MODERATOR, Relator.MONITOR, Relator.MUSIC_COPYIST, Relator.MUSICAL_DIRECTOR,
        Relator.MUSICIAN, Relator.NARRATOR, Relator.OPPONENT, Relator.ORGANIZER_OF_MEETING, Relator.ORIGINATOR,
        Relator.OTHER, Relator.OWNER, Relator.PAPERMAKER, Relator.PATENT_APPLICANT, Relator.PATENT_HOLDER,
        Relator.PATRON, Relator.PERFORMER, Relator.PERMITTING_AGENCY, Relator.PHOTOGRAPHER, Relator.PLAINTIFF,
        Relator.PLAINTIFF_APPELLANT, Relator.PLAINTIFF_APPELLEE, Relator.PLATEMAKER, Relator.PRINTER, Relator.PRINTER_OF_PLATES,
        Relator.PRINTMAKER, Relator.PROCESS_CONTACT, Relator.PRODUCER, Relator.PRODUCTION_MANAGER, Relator.PRODUCTION_PERSONNEL,
        Relator.PROGRAMMER, Relator.PROJECT_DIRECTOR, Relator.PROOFREADER, Relator.PUBLICATION_PLACE, Relator.PUBLISHER,
        Relator.PUBLISHING_DIRECTOR, Relator.PUPPETEER, Relator.RECIPIENT, Relator.RECORDING_ENGINEER, Relator.REDACTOR,
        Relator.RENDERER, Relator.REPORTER, Relator.REPOSITORY, Relator.RESEARCH_TEAM_HEAD, Relator.RESEARCH_TEAM_MEMBER,
        Relator.RESEARCHER, Relator.RESPONDENT, Relator.RESPONDENT_APPELLANT, Relator.RESPONDENT_APPELLEE, Relator.RESPONSIBLE_PARTY,
        Relator.RESTAGER, Relator.REVIEWER, Relator.RUBRICATOR, Relator.SCENARIST, Relator.SCIENTIFIC_ADVISOR,
        Relator.SCRIBE, Relator.SCULPTOR, Relator.SECOND_PARTY, Relator.SECRETARY, Relator.SET_DESIGNER,
        Relator.SIGNER, Relator.SINGER, Relator.SOUND_DESIGNER, Relator.SPEAKER, Relator.SPONSOR,
        Relator.STAGE_MANAGER, Relator.STANDARDS_BODY, Relator.STEREOTYPER, Relator.STORYTELLER, Relator.SUPPORTING_HOST,
        Relator.SURVEYOR, Relator.TEACHER, Relator.TECHNICAL_DIRECTOR, Relator.THESIS_ADVISOR, Relator.TRANSCRIBER,
        Relator.TRANSLATOR, Relator.TYPE_DESIGNER, Relator.TYPOGRAPHER, Relator.UNIVERSITY_PLACE, Relator.VIDEOGRAPHER,
        Relator.VOCALIST, Relator.WITNESS, Relator.WOOD_ENGRAVER, Relator.WOODCUTTER, Relator.WRITER_OF_ACCOMPANYING_MATERIAL
    ];
    private readonly code: string;
    private readonly name: string;
    constructor(code: string, name: string) {
        this.code = code;
        this.name = name;
    }
    public getCode(): string {
        return this.code;
    }
    public getName(): string {
        return this.name;
    }
    public static byCode(code: string): Relator {
        for (let relator of this.relators) {
            if (StringUtil.equalsIgnoreCase(relator.getCode(), code)) {
                return relator;
            }
        }
        return null;
    }
}
export default Relator;
