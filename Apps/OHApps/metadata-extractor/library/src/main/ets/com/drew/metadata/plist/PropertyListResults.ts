/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import Trailer from './Trailer'
export default class PropertyListResults{
   private static  readonly PLIST_DTD:string = "<!DOCTYPE plist PUBLIC \"-//Apple Computer//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">";
      private readonly objects:Array<Object>;
        private readonly  trailer:Trailer;

        public constructor( objects:Array<Object>,  trailer:Trailer)
        {
            this.objects = objects;
            this.trailer = trailer;
        }

        public  getObjects():Array<Object>
        {
            return this.objects;
        }

        public  getTrailer():Trailer
        {
            return this.trailer;
        }

        public getEntrySet():Set<Map<number, number>>
        {
            let  topObject:Object=this.getObjects()[this.getTrailer().getTopObject()]
               if (topObject instanceof Map){
                let dict:Map<number, number> = topObject;
                let entry:Set<Map<number, number>> = new Set();
                entry.add(dict)
                return entry;
                }


            return null;
        }

        /**
         * Returns this result object in XML format.
         */
        public  toXML():string
        {
          let xml ="<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
          +PropertyListResults.PLIST_DTD
          +"<plist version=\"1.0\">";

           let entrySet:Set<Map<number, number>> = this.getEntrySet();
            if (entrySet != null) {
                xml+"<dict>";
              entrySet.forEach((value,value2,SET)=>{
                value.forEach((content,key,map)=>{
                   xml+"<key>"+this.getObjects()[key].toString()
                       +"</key>";
                    xml+"<integer>"
                       +this.getObjects()[content].toString()
                       +"</integer>";
                })
              })

                xml+"</dict>";
            }

            xml+"</plist>";

            return xml.toString();
        }
}