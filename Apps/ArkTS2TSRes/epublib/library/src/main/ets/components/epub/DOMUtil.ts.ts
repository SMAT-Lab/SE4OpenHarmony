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
class DOMUtil {
    public static getAttribute(element: ESObject, namespace: string, attribute: string): string {
        let result = element.getAttributeNS(namespace, attribute);
        if (StringUtil.isEmpty(result)) {
            result = element.getAttribute(attribute);
        }
        return result;
    }
    /**
       * Gets all descendant elements of the given parentElement with the given namespace and tagname and returns their text child as a list of String.
       *
       * @param parentElement
       * @param namespace
       * @param tagname
       * @return
       */
    public static getElementsTextChild(parentElement: ESObject, namespace: string, tagname: string): Array<string> {
        let elements = parentElement.getElementsByTagNameNS(namespace, tagname);
        let result = new Array<string>();
        for (let i = 0; i < elements.length; i++) {
            result.push(DOMUtil.getTextChildrenContent(elements.item(i)));
        }
        return result;
    }
    /**
      * Finds in the current document the first element with the given namespace and elementName and with the given findAttributeName and findAttributeValue.
      * It then returns the value of the given resultAttributeName.
      *
      * @param document
      * @param namespace
      * @param elementName
      * @param findAttributeName
      * @param findAttributeValue
      * @param resultAttributeName
      * @return
      */
    public static getFindAttributeValue(document: ESObject, namespace: string, elementName: string, findAttributeName: string, findAttributeValue: string, resultAttributeName: string): string {
        let metaTags = document.getElementsByTagNameNS(namespace, elementName);
        for (let i = 0; i < metaTags.length; i++) {
            let metaElement = metaTags.item(i);
            if (StringUtil.equalsIgnoreCase(findAttributeValue, metaElement.getAttribute(findAttributeName))
                && StringUtil.isNotBlank(metaElement.getAttribute(resultAttributeName))) {
                return metaElement.getAttribute(resultAttributeName);
            }
        }
        return null;
    }
    /**
       * Gets the first element that is a child of the parentElement and has the given namespace and tagName
       *
       * @param parentElement
       * @param namespace
       * @param tagName
       * @return
       */
    public static getFirstElementByTagNameNS(parentElement: ESObject, namespace: string, tagName: string): ESObject {
        console.info("----DOMUtil.ets----init------getFirstElementByTagNameNS-----parma1----parentElement:" + parentElement);
        console.error("----DOMUtil.ets----init------getFirstElementByTagNameNS-----parma2--namespace:" + namespace);
        console.info("----DOMUtil.ets----init------getFirstElementByTagNameNS-----parma3--tagName:-" + tagName);
        let nodes = parentElement.getElementsByTagNameNS(namespace, tagName);
        console.info("------nodes---nodes.length--" + nodes.length);
        if (nodes.length == 0) {
            return null;
        }
        return nodes.item(0);
    }
    /**
       * The contents of all Text nodes that are children of the given parentElement.
       * The result is trim()-ed.
       *
       * The reason for this more complicated procedure instead of just returning the data of the firstChild is that
       * when the text is Chinese characters then on ohos each Characater is represented in the DOM as
       * an individual Text node.
       *
       * @param parentElement
       * @return
       */
    public static getTextChildrenContent(parentElement: ESObject): string {
        if (parentElement == null) {
            return null;
        }
        let result: string[] = [];
        let childNodes = parentElement.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            let node = childNodes.item(i);
            if ((node == null) ||
                (node.nodeType != 3)) { // Node.TEXT_NODE == 3
                continue;
            }
            result.push(node.textContent);
        }
        return result.join("").trim();
    }
}
export default DOMUtil;
