import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "/home/arthur/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";

const outputDir = "/home/arthur/Desktop/portfolio/outputs/us_client_leads_sep_2026";
const outputPath = `${outputDir}/us_client_leads_100.xlsx`;
const today = "2026-09-16";
const directoryVCU = "https://arts.vcu.edu/wp-content/uploads/2025/01/24-0220-IDES_Internship-Contact_List.pdf";
const directoryAsheville = "https://www.greenbuilt.org/wp-content/uploads/gba-directories/Green-Building-Directory-2020.pdf";
const directoryBirmingham = "https://indianafurniture.com/sites/default/files/content/media/document/2024-04/IndianaFurniture_UnivofAlabama_Dealer_List_4.11.24.pdf";
const directoryMadison = "https://www.cityofmadison.com/business/pw/documents/ConsultantListbyCategory_Nov222021.pdf";

const raw = [
  ["b Studio Architecture","Chris Bonner","Principal","info@bstudioarch.com","Charleston","SC","Architecture","https://bstudioarch.com/","https://bstudioarch.com/","Official website",today],
  ["Lex Layton Interiors","Alexa Layton","Founder","hello@lexlayton.com","Asheville","NC","Interior design","https://www.lexlayton.com/","https://www.lexlayton.com/","Official website",today],
  ["J. Bernard Interiors","Jenny Roberts Bernard","Founder","JBernardInteriors@gmail.com","Savannah","GA","Interior design","https://www.jbernardinteriors.com/","https://www.jbernardinteriors.com/","Official website",today],
  ["Sam Fisch Real Estate Development","Studio team","General enquiries","info@reswpb.com","West Palm Beach","FL","Real estate development","https://samfisch.com/","https://samfisch.com/","Official website",today],
  ["Greyscale Development","Daniel Laub","Founder","info@greyscaledevelopment.com","New York","NY","Real estate development","https://greyscaledevelopment.com/","https://greyscaledevelopment.com/","Official website",today],
  ["Asher + Rye Studio","Studio team","General enquiries","studio@asherandrye.com","Savannah","GA","Interior design","https://www.asherandrye.studio/","https://www.asherandrye.studio/contact","Official website",today],
  ["KASL Design Co","Studio team","General enquiries","info@kasldesignco.com","Charleston","SC","Interior design","https://kasldesignco.com/","https://kasldesignco.com/contact","Official website",today],
  ["SOVI Design Group","Studio team","General enquiries","sovidesignstudio@gmail.com","Savannah","GA","Interior design","https://sovidesign.com/","https://sovidesign.com/","Official website",today],
  ["EKR Interior Design","Emily","Founder","emily@ekrinteriordesign.com","Asheville","NC","Interior design","https://www.ekrinteriordesign.com/","https://www.ekrinteriordesign.com/contact","Official website",today],
  ["SDC Designs","Studio team","General enquiries","sdcinteriordesigners@gmail.com","Greenville","SC","Interior design","https://www.sdcinteriordesign.com/","https://www.sdcinteriordesign.com/contact","Official website",today],
  ["Villa West Design Studio","Studio team","General enquiries","design@villawestdesigns.com","Greenville","SC","Interior design","https://www.villawestdesigns.com/","https://www.villawestdesigns.com/","Official website",today],
  ["Savi Interiors","Studio team","General enquiries","info@saviinteriorsinc.com","Savannah","GA","Interior design","https://www.saviinteriorsinc.com/","https://www.saviinteriorsinc.com/contact","Official website",today],
  ["Northside Design Collective","Studio team","General enquiries","info@northsidedesignco.com","Asheville","NC","Interior design","https://www.northsidedesignco.com/","https://www.northsidedesignco.com/contact/","Official website",today],
  ["Angie Hranowsky","Angie Hranowsky","Founder","angie@angiehranowsky.com","Charleston","SC","Interior design","https://www.angiehranowsky.com/","https://www.angiehranowsky.com/studio","Official website",today],
  ["Courtland & Co Interiors","Studio team","General enquiries","info@courtlandandco.com","Savannah","GA","Interior design","https://courtlandandco.com/","https://courtlandandco.com/pages/interiors","Official website",today],
  ["Ashley Stiles Interiors","Ashley Stiles","Founder","ashley@ashleystilesinteriors.com","Hendersonville","NC","Interior design","https://www.ashleystilesinteriors.com/","https://www.ashleystilesinteriors.com/","Official website",today],
  ["Alchemy Design Studio","Traci Kearns","Founder","traci@alchemy-interiors.com","Asheville","NC","Interior design","https://www.alchemy-interiors.com/","https://www.alchemy-interiors.com/contact/","Official website",today],
  ["Griffin Architects","Robert Griffin","Principal","inquiries@griffinarchitectspa.com","Asheville","NC","Architecture","http://GriffinArchitectsPA.com",directoryAsheville,"Industry directory","2020"],
  ["ID.ology Interiors & Design","Laura Sullivan","Principal","Laura@idologyasheville.com","Asheville","NC","Interior design","https://idologyasheville.com",directoryAsheville,"Industry directory","2020"],
  ["Fusco Land Planning & Design","Matthew Fusco","Principal","matt@fuscola.com","Asheville","NC","Landscape architecture","https://fuscola.com",directoryAsheville,"Industry directory","2020"],
  ["Grant Interior Design Lab","Jane","Principal","jane@grantinteriors.com","Chattanooga","TN","Interior design","https://www.grantinteriors.com/","https://www.grantinteriors.com/","Official website",today],
  ["Chattanooga Design Studio","Studio team","General enquiries","info@chattanoogastudio.com","Chattanooga","TN","Architecture and urban design","https://www.chattanoogastudio.com/","https://www.chattanoogastudio.com/contact","Official website",today],
  ["Yessick's Design Center","Studio team","General enquiries","interiordesigns@yessicks.com","Chattanooga","TN","Interior design","https://yessicks.com/","https://yessicks.com/contact/","Official website",today],
  ["Palette Home Design Studio","Studio team","General enquiries","hello@palettehomedesign.com","Richmond","VA","Interior design","https://www.palettehomedesign.com/","https://www.palettehomedesign.com/pages/contact-visit-us","Official website",today],
  ["Studio Eastman","Abigail Shea","Founder","abigail@studioeastman.com","Portland","ME","Interior design","https://www.studioeastman.com/","https://www.studioeastman.com/contact","Official website",today],
  ["CBM Studio","Celena","Founder","celena@cbmdesignstudio.com","Chattanooga","TN","Interior design","https://www.cbmstudio.design/","https://www.cbmstudio.design/","Official website",today],
  ["StudioVera Design","Antonia","Founder","antonia@studioveradesign.com","Portland","ME","Interior design","https://www.studioveradesign.com/","https://www.studioveradesign.com/contact","Official website",today],
  ["Dana Hennesey Designs","Dana Hennesey","Founder","danahenneseydesigns@gmail.com","Richmond","VA","Interior design","https://danahennesey.com/","https://danahennesey.com/","Official website",today],
  ["Sara Hillery Interior Design","Sara Hillery","Founder","sara@sarahillery.com","Richmond","VA","Interior design","https://www.sarahillery.com/","https://www.sarahillery.com/contact","Official website",today],
  ["SDBinteriors","Shashana","Founder","info@sdbinteriors.com","Richmond","VA","Interior design","https://www.sdbinteriors.com/","https://www.sdbinteriors.com/contact","Official website",today],
  ["Kate Lowry Designs","Kate Lowry","Founder","info@katelowrydesigns.com","Portland","ME","Interior design","https://www.katelowrydesigns.com/","https://www.katelowrydesigns.com/","Official website",today],
  ["Design Object","Abi Spear","Co-founder","hello@design-object.com","Nashville","TN","Interior design","https://www.design-object.com/","https://www.design-object.com/about","Official website",today],
  ["ID&A","Studio team","General enquiries","info-louisville@id-a.com","Louisville","KY","Commercial interiors","https://www.id-a.com/","https://www.id-a.com/","Official website",today],
  ["Berschback Design","Kathryn","Founder","kathryn@berschbackdesign.com","Nashville","TN","Interior design","https://www.berschbackdesign.com/","https://www.berschbackdesign.com/contact","Official website",today],
  ["Amhad Freeman Interiors","Amhad Freeman","Founder","amhad@amhadfreeman.com","Nashville","TN","Interior design","https://www.amhadfreeman.com/","https://www.amhadfreeman.com/contact","Official website",today],
  ["Aly Gia Design","Aly Gia","Founder","alygiadesign@gmail.com","Nashville","TN","Interior design","https://www.alygiadesign.com/","https://www.alygiadesign.com/contact","Official website",today],
  ["Kate Figler Interiors","Kate Figler","Founder","kate@katefiglerinteriors.com","Nashville","TN","Interior design","https://www.katefiglerinteriors.com/","https://www.katefiglerinteriors.com/inquire","Official website",today],
  ["Re Envision Design","Megan","Co-founder","megan@reenvisiondesign.com","Kansas City","MO","Interior design","https://www.reenvisiondesign.com/","https://www.reenvisiondesign.com/contact","Official website",today],
  ["Interior Design Associates","Studio team","General enquiries","info@idassociates.com","Nashville","TN","Interior design","https://idassociates.com/","https://idassociates.com/contact/","Official website",today],
  ["Villa Twenty Four","Vidhi","Founder","vidhi@villatwentyfour.com","Nashville","TN","Interior design","https://www.villatwentyfour.com/","https://www.villatwentyfour.com/contact","Official website",today],
  ["Studio Nine Interiors","Casey","Founder","studionine.casey@gmail.com","Louisville","KY","Interior design","https://www.studionineinteriors.com/","https://www.studionineinteriors.com/","Official website",today],
  ["Kara Kersten Design","Kara Kersten","Founder","infokarakerstendesign@gmail.com","Kansas City","MO","Interior design","https://karakerstendesign.com/","https://karakerstendesign.com/contact","Official website",today],
  ["Norman Dudley Interiors & Fine Art","Norman Dudley","Founder","info@normandudley.com","Santa Fe","NM","Interior design","https://www.normandudley.com/","https://www.normandudley.com/contact","Official website",today],
  ["Troy Tryon Interiors","Troy Tryon","Founder","troy@troytryon.com","Santa Fe","NM","Interior design","https://troytryon.com/","https://troytryon.com/contact/","Official website",today],
  ["Circin Studio","Katrina Dippner","Founder","katrina@circinstudio.com","Palm Springs","CA","Interior design","https://www.circinstudio.com/","https://www.circinstudio.com/","Official website",today],
  ["PARE Interior Design","Studio team","General enquiries","info@pareinteriordesign.com","Santa Fe","NM","Interior design","https://pareinteriordesign.com/","https://pareinteriordesign.com/contact","Official website",today],
  ["HVL Interiors","Studio team","General enquiries","info@hvlinteriors.com","Santa Fe","NM","Interior design","https://www.hvlinteriors.com/","https://www.hvlinteriors.com/contact/","Official website",today],
  ["Studio CABAN","Studio team","General enquiries","hola@studiocaban.com","Tucson","AZ","Interior design","https://www.studiocaban.com/","https://www.studiocaban.com/","Official website",today],
  ["Design Vision Studio","Studio team","General enquiries","team@designvisionstudio.com","Palm Desert","CA","Interior design","https://www.designvisionstudio.com/","https://www.designvisionstudio.com/contact/","Official website",today],
  ["Madeleine Boos Architecture + Interiors","Madeleine Boos","Founder","madbdesign@gmail.com","Tucson","AZ","Architecture and interiors","https://www.madeleineboos.com/","https://www.madeleineboos.com/","Official website",today],
  ["French & French Interiors","Matt and Heather French","Founders","hello@frenchandfrenchinteriors.com","Santa Fe","NM","Interior design","https://frenchandfrenchinteriors.com/","https://frenchandfrenchinteriors.com/contact-us/","Official website",today],
  ["Chandler Prewitt Design","Chandler Prewitt","Founder","info@chandlerprewitt.com","Santa Fe","NM","Interior design","https://chandlerprewitt.com/","https://chandlerprewitt.com/about-chandler-prewitt","Official website",today],
  ["Interior Innovations","Studio team","General enquiries","info@interiorinnov.com","Tucson","AZ","Interior design","https://azinteriorinnovations.com/","https://azinteriorinnovations.com/contact-us/","Official website",today],
  ["Hatcher Schuster","Ivy Schuster","Principal","ivy@hsinteriordesign.com","Birmingham","AL","Interior design","https://www.hsinteriordesign.com/","https://www.hsinteriordesign.com/connect","Official website",today],
  ["Liz Hand Woods Associates","Liz Hand Woods","Founder","liz@lizhandwoods.com","Birmingham","AL","Interior design","https://lizhandwoods.com/","https://lizhandwoods.com/","Official website",today],
  ["OK Interior Decor","Studio team","General enquiries","tulsainteriordesign@gmail.com","Tulsa","OK","Interior design","https://www.tulsainteriordesign.org/","https://www.tulsainteriordesign.org/services","Official website",today],
  ["Pentimento by Tish Fuller","Tish Fuller","Founder","tish@defininghome.com","Birmingham","AL","Interior design","https://www.tishfuller.com/","https://www.tishfuller.com/","Official website",today],
  ["Element Design Studio","Ella","Founder","Ella@ElementDesignStudio.Org","Grand Rapids","MI","Interior design","https://www.elementdesignstudio.org/","https://www.elementdesignstudio.org/","Official website",today],
  ["L. Vogtle Interiors","Laura Vogtle","Founder","hello@lvogtleinteriors.com","Birmingham","AL","Interior design","https://www.lvogtleinteriors.com/","https://www.lvogtleinteriors.com/","Official website",today],
  ["Holcombe Interior Design","Dana Holcombe","Founder","dana@holcombeinteriordesign.com","Birmingham","AL","Interior design","https://www.holcombeinteriordesign.com/","https://www.holcombeinteriordesign.com/contact","Official website",today],
  ["W Haus of Design","Studio team","General enquiries","info@whausofdesign.com","Grand Rapids","MI","Interior design","https://www.whausofdesign.com/","https://www.whausofdesign.com/contact","Official website",today],
  ["Alima Deneke Interior Design Studio","Alima Deneke","Founder","alima@adidstudio.com","Birmingham","AL","Interior design","https://www.adidstudio.com/","https://www.adidstudio.com/studio","Official website",today],
  ["Harper House Collective","Chelsea Harper Wilson","Founder","chelsea@harperhousecollective.com","Tulsa","OK","Interior design","https://www.harperhousecollective.com/","https://www.harperhousecollective.com/","Official website",today],
  ["JM&Co Design Studio","Studio team","General enquiries","info@jmco.design","Grand Rapids","MI","Interior design","https://www.jmco.design/","https://www.jmco.design/contact-9","Official website",today],
  ["Cameron Mobley Interior Design","Cameron Mobley","Founder","cameron@cameronmobley.com","Birmingham","AL","Interior design","https://www.cameronmobley.com/","https://www.cameronmobley.com/","Official website",today],
  ["LT Design Co","Lindsay Trabing","Founder","hello@ltdesigncoia.com","Des Moines","IA","Interior design","https://ltdesigncoia.com/","https://ltdesigncoia.com/","Official website",today],
  ["Sloans Interiors","Katie Sloan","Founder","Creatingyourspaces@gmail.com","Colorado Springs","CO","Interior design","https://www.sloansinteriors.com/","https://www.sloansinteriors.com/","Official website",today],
  ["Clover Design Co","Ireland Kuzma","Founder","clover.design.interiors@gmail.com","Fort Collins","CO","Interior design","https://www.cloverdesignco.com/","https://www.cloverdesignco.com/contact-8","Official website",today],
  ["The Bespoke Space","Kait Parkinson","Founder","hello@thebespokespace.com","Fort Collins","CO","Interior design","https://www.thebespokespace.com/","https://www.thebespokespace.com/","Official website",today],
  ["The Hills Design Co","Alexis Dotzler","Founder","hello@thehillsdesignco.com","Knoxville","TN","Interior design","https://www.thehillsdesignco.com/","https://www.thehillsdesignco.com/","Official website",today],
  ["Salt Design","Studio team","General enquiries","info@saltdesign.com","Fort Collins","CO","Interior design","https://saltdesign.com/","https://saltdesign.com/","Official website",today],
  ["FEH Design","Tyler","Studio contact","tylerr@fehdesign.com","Des Moines","IA","Architecture and design","https://fehdesign.com/","https://fehdesign.com/contact-feh-design/","Official website",today],
  ["Meredith Parrish Design","Meredith Parrish","Founder","MeredithPDesign@gmail.com","Fort Collins","CO","Interior design","https://www.meredithparrish.design/","https://www.meredithparrish.design/contact","Official website",today],
  ["Studio MELEE","Jamie Malloy","Founder","jamie@studiomelee.com","West Des Moines","IA","Interior design","https://www.studiomelee.com/","https://www.studiomelee.com/","Official website",today],
  ["Savvy Interior Design","Tara","Founder","SavvyInteriorDesign@gmail.com","Fort Collins","CO","Interior design","https://savvyhomedesigns.co/","https://savvyhomedesigns.co/contact-us","Official website",today],
  ["Delta Design","Sonja","Founder","sonja@deltadesigndsm.com","Des Moines","IA","Interior design","https://www.deltadesigndsm.com/","https://www.deltadesigndsm.com/contact-us","Official website",today],
  ["Aptus Design Group","Studio team","General enquiries","info@aptusdesigngroup.com","Knoxville","TN","Interior design","https://www.aptusdesigngroup.com/","https://www.aptusdesigngroup.com/pages/contact-us","Official website",today],
  ["Studio Four Design","Corey Boss","Principal","cboss@s4dinc.com","Knoxville","TN","Architecture and design","https://studiofourdesign.com",directoryVCU,"Public design directory","2025-01"],
  ["Dimension IV Madison Design Group","Jim Gersich","Principal","jgersich@dimensionivmadison.com","Madison","WI","Architecture and design","https://dimensionivmadison.com",directoryMadison,"Public consultant list","2021-11"],
  ["Destree Design Architects","Melissa Destree","Principal","melissa@destreearchitects.com","Madison","WI","Architecture","https://destreearchitects.com",directoryMadison,"Public consultant list","2021-11"],
  ["Design Studio Etc","G. Perry","Principal","gperry@designstudioetc.com","Madison","WI","Architecture and design","https://designstudioetc.com",directoryMadison,"Public consultant list","2021-11"],
  ["Dorschner Associates","Studio team","General enquiries","ddorschner@dorschnerassociates.com","Madison","WI","Architecture","https://dorschnerassociates.com",directoryMadison,"Public consultant list","2021-11"],
  ["AI Corporate Interiors","Catherine Waters","Sales contact","cwaters@aicorporateinteriors.com","Birmingham","AL","Commercial interiors","https://aicorporateinteriors.com",directoryBirmingham,"Dealer directory","2024-04"],
  ["Burgess & Co","Owen Burgess","Principal","owen@burgessinteriors.com","Birmingham","AL","Commercial interiors","https://burgessinteriors.com",directoryBirmingham,"Dealer directory","2024-04"],
  ["Business Interiors","Steve Groover","Sales contact","sgroover@businteriors.com","Birmingham","AL","Commercial interiors","https://businteriors.com",directoryBirmingham,"Dealer directory","2024-04"],
  ["Interior Elements","Bryan Mullins","Sales contact","bmullins@in-elements.com","Birmingham","AL","Commercial interiors","https://in-elements.com",directoryBirmingham,"Dealer directory","2024-04"],
  ["One Source Office Design","Michael Parrish","Principal","michael@onesourceofficedesign.com","Northport","AL","Commercial interiors","https://onesourceofficedesign.com",directoryBirmingham,"Dealer directory","2024-04"],
  ["Turnerboone","Erin Schumacher","Sales contact","erin.schumacher@turnerboone.com","Birmingham","AL","Commercial interiors","https://turnerboone.com",directoryBirmingham,"Dealer directory","2024-04"],
  ["Mills Architecture","Jeffrey Mills","Principal","jmills@millsarchitecture.com","Des Moines","IA","Architecture","https://millsarchitecture.com",directoryMadison,"Public consultant list","2021-11"],
  ["37 Ideas","Peter Fraser","Principal","peter@37ideas.com","Richmond","VA","Architecture and design","https://www.37ideas.com",directoryVCU,"VCU design directory","2025-01"],
  ["510 Architects","Heather Grutzius","Studio contact","info@510spaces.com","Richmond","VA","Architecture and interiors","https://510spaces.com",directoryVCU,"VCU design directory","2025-01"],
  ["A Concept 2 Design","Merrit Jackson","Founder","merrit@aconcept2design.com","Midlothian","VA","Interior design","https://aconcept2design.com",directoryVCU,"VCU design directory","2025-01"],
  ["Accent Interiors","Karen Hardy","Founder","Karen@accentinteriorsrva.com","Richmond","VA","Interior design","https://www.weloveyourspace.com",directoryVCU,"VCU design directory","2025-01"],
  ["ADO","Todd Dykshorn","Principal","todd@ado.design","Richmond","VA","Architecture and design","https://ado.design",directoryVCU,"VCU design directory","2025-01"],
  ["Angela Elliott Interiors","Angela Elliott","Founder","angela@angelaelliottinteriors.com","Richmond","VA","Interior design","https://angelaelliottinteriors.com",directoryVCU,"VCU design directory","2025-01"],
  ["Beaty & Brown","Mary Reed","Studio contact","mary@beatyandbrown.com","Richmond","VA","Interior design","https://beatyandbrown.com",directoryVCU,"VCU design directory","2025-01"],
  ["Bridget Beari Design","Susan Jamieson","Founder","info@bridgetbeari.com","Richmond","VA","Interior design","https://bridgetbearidesigns.com",directoryVCU,"VCU design directory","2025-01"],
  ["Courtney Ludeman Interiors","Courtney Ludeman","Founder","courtneyludemaninteriors@gmail.com","Richmond","VA","Interior design","https://www.courtneyludeman.com",directoryVCU,"VCU design directory","2025-01"],
  ["Decorum","Leah Dodge","Founder","leah@decorum-interiors.com","Richmond","VA","Interior design","https://decorum-interiors.com",directoryVCU,"VCU design directory","2025-01"],
  ["Flourish Spaces","Stevie McFadden","Founder","Stevie@flourishspaces.com","Richmond","VA","Interior design","https://www.flourishspaces.com/",directoryVCU,"VCU design directory","2025-01"]
];

if (raw.length !== 100) throw new Error(`Expected 100 leads, found ${raw.length}`);

const fitBySegment = {
  "Interior design": "A visual service business where an editorial portfolio and clearer inquiry path can directly support lead generation.",
  "Architecture": "A project-led practice that can benefit from concise case studies, stronger mobile presentation and a clear inquiry route.",
  "Architecture and interiors": "A highly visual practice suited to a refined portfolio that connects project imagery with a clear service story.",
  "Architecture and design": "A multidisciplinary studio where a clearer hierarchy can make capabilities and project work easier to explore.",
  "Architecture and urban design": "A specialist studio that can present complex work through simple, well-paced digital storytelling.",
  "Landscape architecture": "A visual practice where process, plans and finished environments can become a strong narrative case study.",
  "Commercial interiors": "A B2B design firm that can use a focused capabilities page and selected projects to support sales conversations.",
  "Real estate development": "A project-driven business suited to a polished development page with strong imagery and direct enquiry actions."
};

const possessive = (name) => name.endsWith("s") ? `${name}'` : `${name}'s`;

const angleBySegment = {
  "Interior design": (name) => `Lead with ${possessive(name)} strongest rooms, then use a calm editorial project flow to turn browsing into enquiries.`,
  "Architecture": (name) => `Give ${possessive(name)} selected projects more visual space and make the project story easy to scan on mobile.`,
  "Architecture and interiors": (name) => `Connect ${possessive(name)} architecture and interior work in one clear, image-led case study system.`,
  "Architecture and design": (name) => `Organize ${possessive(name)} work around a few strong outcomes instead of making visitors decode a long capabilities list.`,
  "Architecture and urban design": (name) => `Use paced project storytelling to make ${possessive(name)} planning work feel accessible without flattening the detail.`,
  "Landscape architecture": (name) => `Show ${possessive(name)} process from plan to finished place with a simple, visual before-and-after narrative.`,
  "Commercial interiors": (name) => `Build a compact sales-facing portfolio for ${name} that pairs proof of work with a direct project enquiry path.`,
  "Real estate development": (name) => `Create a focused launch page for one ${name} development with premium motion, clear amenities and direct enquiries.`
};

const subjects = [
  (n) => `A website idea for ${n}`,
  (n) => `${possessive(n)} project portfolio`,
  () => "A possible homepage direction",
  () => "Idea for presenting your work"
];

const segmentPhrase = {
  "Interior design": "interior design",
  "Architecture": "architecture",
  "Architecture and interiors": "architecture and interior design",
  "Architecture and design": "architecture and design",
  "Architecture and urban design": "architecture and urban design",
  "Landscape architecture": "landscape architecture",
  "Commercial interiors": "commercial interiors",
  "Real estate development": "real estate development"
};

function greeting(contact, business) {
  if (contact === "Studio team") return `Hi ${business} team,`;
  if (contact.includes(" and ")) {
    const names = contact.split(" and ").map((name) => name.trim().split(" ")[0]);
    return `Hi ${names.join(" and ")},`;
  }
  return `Hi ${contact.split(" ")[0]},`;
}

function exactEmail({ business, contact, city, segment, angle }) {
  const direction = `${angle[0].toLowerCase()}${angle.slice(1)}`;
  return `${greeting(contact, business)}\n\nI found ${business} while researching ${segmentPhrase[segment]} practices in ${city}. My idea would be to ${direction}\n\nI am a designer and developer taking on a small number of portfolio partner projects before October. I can design and build a polished, responsive one-page website for $450. That includes custom design, purposeful motion, contact integration, deployment and one revision round.\n\nIf a focused website update would be useful this season, would you be open to a 15-minute call?\n\nMy work: https://bhaskarjyotipathak.in\n\nBest,\nBhaskar Pathak\n[YOUR POSTAL ADDRESS]\n\nIf you would rather not hear from me again, reply no and I will not follow up.`;
}

const rows = raw.map((lead, i) => {
  const [business, contact, role, email, city, state, segment, website, source, sourceType, verified] = lead;
  const isCurrent = verified === today;
  const direct = role !== "General enquiries" && role !== "Sales contact" && role !== "Studio contact";
  const priority = isCurrent && direct ? "A" : isCurrent ? "B" : "C";
  const angle = angleBySegment[segment](business);
  return [
    i + 1, priority, business, contact, role, email, "", city, state, segment, website,
    fitBySegment[segment], angle, subjects[i % subjects.length](business),
    "Not contacted", "", "", source, sourceType, verified,
    exactEmail({ business, contact, city, segment, angle })
  ];
});

const workbook = Workbook.create();
const leads = workbook.worksheets.add("Leads");
const guide = workbook.worksheets.add("Sending Guide");
leads.showGridLines = false;
guide.showGridLines = false;
leads.tabColor = "#111111";
guide.tabColor = "#6B7280";

const headers = [["ID","Priority","Business","Contact person","Role","Email","Phone","City","State","Segment","Website","Why this lead fits","Personalized opening angle","Suggested subject","Status","Last contacted","Follow-up date","Source URL","Source type","Verified / source date","Exact email body"]];
leads.getRange("A1").values = [["US client leads"]];
leads.getRange("C2").values = [["100 US public business contacts. Recheck directory-sourced rows before sending."]];
leads.getRange("A4:U4").values = headers;
leads.getRange("A5:U104").values = rows;

leads.getRange("A1:U1").format = { fill: "#111111", font: { color: "#FFFFFF", bold: true, size: 22 }, verticalAlignment: "center" };
leads.getRange("A1:U1").format.rowHeightPx = 42;
leads.getRange("A2:U2").format = { fill: "#F3F4F6", font: { color: "#374151", size: 10 }, verticalAlignment: "center", wrapText: true };
leads.getRange("A2:U2").format.rowHeightPx = 60;
leads.getRange("A4:U4").format = { fill: "#292929", font: { color: "#FFFFFF", bold: true, size: 10 }, verticalAlignment: "center", wrapText: true };
leads.getRange("A4:U4").format.rowHeightPx = 34;
leads.getRange("A5:U104").format = { font: { color: "#1F2937", size: 9 }, verticalAlignment: "top", wrapText: true };
leads.getRange("A5:U104").format.rowHeightPx = 315;
leads.getRange("A5:U104").format.borders = { insideHorizontal: { style: "thin", color: "#E5E7EB" } };
leads.getRange("A5:B104").format.horizontalAlignment = "center";
leads.getRange("A5:B104").format.verticalAlignment = "center";

const widths = [44,58,180,135,110,210,105,105,48,145,190,245,285,205,100,96,96,240,130,125,520];
widths.forEach((width, i) => { leads.getRangeByIndexes(0, i, 104, 1).format.columnWidthPx = width; });
leads.freezePanes.freezeRows(4);
leads.freezePanes.freezeColumns(3);
const leadTable = leads.tables.add("A4:U104", true, "USClientLeads");
leadTable.style = "TableStyleMedium2";
leadTable.showBandedRows = true;
leadTable.showFilterButton = true;

leads.getRange("B5:B104").dataValidation = { rule: { type: "list", values: ["A","B","C"] } };
leads.getRange("O5:O104").dataValidation = { rule: { type: "list", values: ["Not contacted","Sent","Replied","Follow-up","Call booked","Closed","Do not contact"] } };
leads.getRange("P5:Q104").setNumberFormat("yyyy-mm-dd");
leads.getRange("B5:B104").conditionalFormats.add("cellIs", { operator: "equal", formula: '"A"', format: { fill: "#DCFCE7", font: { color: "#166534", bold: true } } });
leads.getRange("B5:B104").conditionalFormats.add("cellIs", { operator: "equal", formula: '"B"', format: { fill: "#FEF3C7", font: { color: "#92400E", bold: true } } });
leads.getRange("B5:B104").conditionalFormats.add("cellIs", { operator: "equal", formula: '"C"', format: { fill: "#F3F4F6", font: { color: "#4B5563", bold: true } } });
leads.getRange("O5:O104").conditionalFormats.add("containsText", { text: "Call booked", format: { fill: "#DBEAFE", font: { color: "#1D4ED8", bold: true } } });
leads.getRange("O5:O104").conditionalFormats.add("containsText", { text: "Closed", format: { fill: "#DCFCE7", font: { color: "#166534", bold: true } } });
leads.getRange("O5:O104").conditionalFormats.add("containsText", { text: "Do not contact", format: { fill: "#FEE2E2", font: { color: "#991B1B", bold: true } } });

guide.getRange("A1").values = [["Sending guide"]];
guide.getRange("B2").values = [["Start with Priority A, then B. Recheck every directory-sourced contact before sending."]];
guide.getRange("A4:B4").values = [["Offer","Portfolio Partner Website Sprint"]];
guide.getRange("A5:B9").values = [
  ["Price","$450 fixed"],
  ["Scope","One polished marketing page, custom design, responsive build, purposeful motion, contact integration and deployment"],
  ["Timeline","7 days after content is received"],
  ["Revision","One consolidated revision round"],
  ["Positioning","A limited portfolio partner rate, not a discounted template website"]
];
guide.getRange("A11").values = [["Initial email"]];
guide.getRange("A12:B12").values = [["Copy","Subject: [use the suggested subject from the Leads sheet]\n\nHi [first name],\n\nI came across [business] and thought your work would suit a more editorial, image-led website experience. One direction I would explore is [personalized opening angle].\n\nI am taking on a small number of portfolio partner projects before October. I can design and build a polished, responsive one-page site for $450, including purposeful motion, contact integration, deployment and one revision round.\n\nMy work: https://bhaskarjyotipathak.in\n\nWould you be open to a 15-minute call?\n\nBest,\nBhaskar Pathak\n[YOUR POSTAL ADDRESS]\n\nIf you would rather not hear from me again, reply no and I will not follow up."]];
guide.getRange("A19:C19").values = [["Follow-up","When","Copy"]];
guide.getRange("A20:C21").values = [
  ["1","3 business days","Hi [first name], following up in case the website idea below is useful. I would be happy to send a quick homepage direction for [business]."],
  ["2","6 to 7 business days","Last note from me. If a website refresh is not a priority right now, no problem. If it is, I can reserve one portfolio partner slot before October."]
];
guide.getRange("A23").values = [["Sending checklist"]];
guide.getRange("A24:B31").values = [
  ["1","Use accurate sender details and a truthful subject line."],
  ["2","Make the message clearly commercial. Do not disguise it as an existing relationship."],
  ["3","Include a valid postal address in your email signature."],
  ["4","Give recipients a clear way to opt out."],
  ["5","Honor opt-out requests within 10 business days and keep a suppression list."],
  ["6","Send individually or in very small batches. Personalize the opening and do not attach files."],
  ["7","Recheck the business, email and website before sending. Public directory contacts can become outdated."],
  ["8","This is a practical checklist based on FTC guidance, not legal advice."]
];
guide.getRange("A33:B34").values = [
  ["FTC source","https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business"],
  ["Note","The FTC guide states that CAN-SPAM applies to commercial email, including business-to-business messages."]
];
guide.getRange("A36:B36").values = [["Required edit","Replace [YOUR POSTAL ADDRESS] in every email before sending. A valid postal address is required by the FTC guidance referenced above."]];

guide.getRange("A1:C1").format = { fill: "#111111", font: { color: "#FFFFFF", bold: true, size: 18 }, verticalAlignment: "center" };
guide.getRange("A1:C1").format.rowHeightPx = 58;
guide.getRange("A2:C2").format = { fill: "#F3F4F6", font: { color: "#374151", size: 10 }, wrapText: true, verticalAlignment: "center" };
guide.getRange("A2:C2").format.rowHeightPx = 38;
for (const ref of ["A11:C11","A23:C23"]) {
  guide.getRange(ref).format = { fill: "#292929", font: { color: "#FFFFFF", bold: true, size: 12 }, verticalAlignment: "center" };
  guide.getRange(ref).format.rowHeightPx = 28;
}
guide.getRange("A4:A9").format = { fill: "#E5E7EB", font: { bold: true, color: "#111827" }, verticalAlignment: "top" };
guide.getRange("A4:B9").format.borders = { preset: "all", style: "thin", color: "#D1D5DB" };
guide.getRange("A12:B12").format = { fill: "#FAFAFA", font: { color: "#1F2937", size: 11 }, wrapText: true, verticalAlignment: "top", borders: { preset: "all", style: "thin", color: "#D1D5DB" } };
guide.getRange("A12:B12").format.rowHeightPx = 420;
guide.getRange("A19:C19").format = { fill: "#292929", font: { color: "#FFFFFF", bold: true }, verticalAlignment: "center" };
guide.getRange("A20:C21").format = { wrapText: true, verticalAlignment: "top", borders: { preset: "all", style: "thin", color: "#D1D5DB" } };
guide.getRange("A20:C21").format.rowHeightPx = 50;
guide.getRange("A24:A31").format = { fill: "#E5E7EB", font: { bold: true }, horizontalAlignment: "center", verticalAlignment: "top" };
guide.getRange("A24:B31").format = { wrapText: true, verticalAlignment: "top", borders: { preset: "all", style: "thin", color: "#D1D5DB" } };
guide.getRange("A24:B31").format.rowHeightPx = 36;
guide.getRange("A33:A34").format = { fill: "#E5E7EB", font: { bold: true }, verticalAlignment: "top" };
guide.getRange("A33:B34").format = { wrapText: true, verticalAlignment: "top", borders: { preset: "all", style: "thin", color: "#D1D5DB" } };
guide.getRange("A33:B34").format.rowHeightPx = 42;
guide.getRange("A36").format = { fill: "#FEF3C7", font: { bold: true, color: "#92400E" }, verticalAlignment: "top" };
guide.getRange("B36").format = { fill: "#FFFBEB", font: { color: "#78350F" }, verticalAlignment: "top", wrapText: true };
guide.getRange("A36:B36").format.borders = { preset: "all", style: "thin", color: "#F59E0B" };
guide.getRange("A36:B36").format.rowHeightPx = 48;
guide.getRange("A:F").format.font.name = "Arial";
guide.getRange("A1:F34").format.wrapText = true;
guide.getRange("A:A").format.columnWidthPx = 165;
guide.getRange("B:B").format.columnWidthPx = 530;
guide.getRange("C:C").format.columnWidthPx = 560;
guide.getRange("D:F").format.columnWidthPx = 90;
guide.freezePanes.freezeRows(2);

await fs.mkdir(outputDir, { recursive: true });
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

const leadsInspect = await workbook.inspect({ kind: "table", range: "Leads!N4:U8", include: "values,formulas", tableMaxRows: 5, tableMaxCols: 8, maxChars: 12000 });
const guideInspect = await workbook.inspect({ kind: "table", range: "Sending Guide!A23:C36", include: "values,formulas", tableMaxRows: 14, tableMaxCols: 3, maxChars: 8000 });
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan" });
console.log(leadsInspect.ndjson);
console.log(guideInspect.ndjson);
console.log(errors.ndjson);

const leadsPreview = await workbook.render({ sheetName: "Leads", range: "N4:U7", scale: 1.15, format: "png" });
await fs.writeFile(`${outputDir}/leads_preview.png`, new Uint8Array(await leadsPreview.arrayBuffer()));
const guidePreview = await workbook.render({ sheetName: "Sending Guide", range: "A1:C36", scale: 1.2, format: "png" });
await fs.writeFile(`${outputDir}/sending_guide_preview.png`, new Uint8Array(await guidePreview.arrayBuffer()));

console.log(JSON.stringify({ outputPath, leads: raw.length }));
