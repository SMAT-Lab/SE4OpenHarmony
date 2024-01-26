# metadata-extractor单元测试用例

该测试用例基于OpenHarmony系统下，采用[原库测试用例](https://github.com/drewnoakes/metadata-extractor/tree/master/Tests)
进行单元测试

单元测试用例覆盖情况

|                  接口名                   |是否通过	|备注|
|:--------------------------------------:|:---:|:---:|
|            ImageMetadataReader.readMetadata()           |    pass        |       |
|            MetadataReader.extract()          |pass   |        |
|              Metadata.getDirectories()             |pass   |        |
|           Metadata.getDirectoriesOfType()         |pass   |        |
|              Metadata.getDirectoryCount()           |pass   |        |
|            Metadata.addDirectory()          |pass   |        |
|          Metadata.getFirstDirectoryOfType()         |pass  |     |
|            Metadata.containsDirectoryOfType()            |   pass  |          |
|        Directory.getName()       | pass |  |
|         Directory.getTags()         | pass  |       |
|           Directory.getTagCount()          |  pass |          |
|           Directory.setDescriptor()        |  pass |          |
|       Directory.getParent()       | pass  |          |
|              Directory.getDate()              | pass  |          |
