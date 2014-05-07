ALTER TABLE `detect`.`standardtmptercorrection` 
CHANGE COLUMN `value` `value` DOUBLE NULL DEFAULT NULL COMMENT '名义温度' ;

ALTER TABLE `detect`.`detectrecord` 
CHANGE COLUMN `detectTemp` `detectTemp` DOUBLE NULL DEFAULT NULL COMMENT '名义温度' ;
