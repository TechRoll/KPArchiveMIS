
--fileinfo表的建表sql
CREATE TABLE `fileinfo` (
`fileId`  int NOT NULL AUTO_INCREMENT ,
`fileName`  varchar(138) CHARACTER SET utf8 NOT NULL DEFAULT '' ,
`timeName`  varchar(18) CHARACTER SET utf8 NOT NULL DEFAULT '' ,
`realPath`  varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '' ,
`timePath`  varchar(38) CHARACTER SET utf8 NOT NULL DEFAULT '' ,
`file`  longblob NOT NULL ,
PRIMARY KEY (`fileId`)
)
;