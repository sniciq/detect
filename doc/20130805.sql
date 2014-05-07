
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: localhost    Database: detect
-- ------------------------------------------------------
-- Server version	5.5.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detectrecord`
--

DROP TABLE IF EXISTS `detectrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detectrecord` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `standardTmpterId` int(11) DEFAULT NULL COMMENT '标准器ID',
  `experimentNo` varchar(100) DEFAULT NULL COMMENT '实验编号',
  `equipmentNo` varchar(45) DEFAULT NULL COMMENT '院设备编号：RG024,RG025,RG026',
  `temp` double DEFAULT NULL COMMENT '温度',
  `humidity` double DEFAULT NULL COMMENT '湿度',
  `address` varchar(500) DEFAULT NULL COMMENT '地点',
  `createDate` datetime DEFAULT NULL COMMENT '时间',
  `detectTemp` double DEFAULT NULL COMMENT '名义温度',
  `temp1` double DEFAULT NULL COMMENT '读数1',
  `temp2` double DEFAULT NULL COMMENT '读数2',
  `temp3` double DEFAULT NULL COMMENT '读数3(干度2)',
  `temp4` double DEFAULT NULL COMMENT '读数4湿度2)',
  `tempAvg1` double DEFAULT NULL COMMENT '平均读数',
  `tempAvg2` double DEFAULT NULL COMMENT '平均读数2（湿度）',
  `tempReal` double DEFAULT NULL COMMENT '温槽实际温度',
  `detectBasis` varchar(45) DEFAULT NULL COMMENT '测定依据:JJG123-2011\\\\JJG131-2004',
  `createUserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detectrecord`
--

LOCK TABLES `detectrecord` WRITE;
/*!40000 ALTER TABLE `detectrecord` DISABLE KEYS */;
INSERT INTO `detectrecord` VALUES (2,2,'1-002','RG024',12,12,'1212',NULL,12,12,12,12,12,12,12,12,'JJG123-2011',NULL),(3,2,'1-001','RG024',22,22,'22','2013-07-17 14:11:39',2,2,0,0,0,0,0,0,'JJG123-2011',NULL),(4,2,'20130718001','RG024',30,40,'本院3504房间','2013-07-18 11:57:10',10,10,10,NULL,NULL,NULL,NULL,11,'JJG130-2011',1),(5,4,'20130718002','RG024',30,30,'本院3504房间','2013-07-18 12:03:07',10,6,14,12,12,10,NULL,12,'JJG130-2011',1),(6,4,'20130718003','RG024',30,30,'本院3504房间','2013-07-18 12:06:32',10,10,20,NULL,NULL,15,NULL,17,'JJG130-2011',1),(7,4,'20130718004','RG024',30,30,'本院3504房间','2013-07-18 12:11:37',10,10,13,NULL,NULL,11.5,NULL,13.5,'JJG130-2011',1),(8,2,'20130718005','RG025',40,40,'本院3504房间','2013-07-18 12:17:05',20,18,22,NULL,NULL,20,NULL,22,'JJG130-2011',1),(9,4,'20130720001','RG024',20,20,'本院3504房间','2013-07-20 19:54:11',10,10,30,NULL,NULL,24,NULL,25,'JJG130-2011',1),(10,2,'20130720002','RG024',20,20,'本院3504房间','2013-07-20 20:41:51',20,10,20,NULL,NULL,15,NULL,17,'JJG130-2011',1),(11,2,'20130720003','RG024',20,30,'本院3504房间','2013-07-20 20:46:19',20,22,25,NULL,NULL,23.5,NULL,25.5,'JJG130-2011',1),(12,2,'20130720004','RG024',20,20,'本院3504房间','2013-07-20 20:52:01',20,20,20,NULL,NULL,20,NULL,22,'JJG130-2011',1),(13,2,'20130720005','RG024',20,20,'本院3504房间','2013-07-20 23:16:04',10,10,12,NULL,NULL,11,NULL,12,'JJG130-2011',1),(14,2,'20130721001','RG024',20,20,'本院3504房间','2013-07-21 20:50:58',20,20,20,NULL,NULL,20,NULL,22,'JJG130-2011',1),(15,2,'20130721002','RG024',20,20,'本院3504房间','2013-07-21 20:56:29',20,20,20,NULL,NULL,20,NULL,22,'JJG130-2011',1),(16,2,'20130721003','RG024',20,20,'本院3504房间','2013-07-21 20:57:39',20,20,20,NULL,NULL,20,NULL,22,'JJG130-2011',1),(17,2,'20130805001','RG024',20,20,'本院3504房间','2013-08-05 21:50:38',20,2,2,NULL,NULL,2,NULL,4,'JJG130-2011',1);
/*!40000 ALTER TABLE `detectrecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detecttemp`
--

DROP TABLE IF EXISTS `detecttemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detecttemp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `temp` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='检测点设置';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detecttemp`
--

LOCK TABLES `detecttemp` WRITE;
/*!40000 ALTER TABLE `detecttemp` DISABLE KEYS */;
INSERT INTO `detecttemp` VALUES (1,'水银温度计检测点',10),(2,'水银温度计检测点',20),(3,'水银温度计检测点',30),(4,'水银温度计检测点',40),(5,'石油温度计检测点',30),(6,'石油温度计检测点',50),(7,'石油温度计检测点',70);
/*!40000 ALTER TABLE `detecttemp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resource`
--

DROP TABLE IF EXISTS `resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resource` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nodeId` int(10) DEFAULT NULL,
  `menuName` varchar(45) DEFAULT NULL,
  `parantNodeID` int(10) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `openIcon` varchar(100) DEFAULT NULL,
  `actionPath` varchar(300) DEFAULT NULL,
  `menuOrder` int(10) DEFAULT NULL,
  `isValiDate` char(1) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `jsClassFile` varchar(500) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `namespace` varchar(100) DEFAULT NULL,
  `mainClass` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='²Ëµ¥×ÊÔ´';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resource`
--

LOCK TABLES `resource` WRITE;
/*!40000 ALTER TABLE `resource` DISABLE KEYS */;
INSERT INTO `resource` VALUES (4,8000,'系统管理',0,'../images/systemControl.png',NULL,'',8000,'1','','','iframe',NULL,''),(5,8001,'资源管理',8000,'../images/icon32/1335953321_maintenance.png',NULL,'',8001,'1','','basic/ResourcePanel.js','JSClass',NULL,'com.ms.basic.ResourcePanel'),(6,8002,'用户管理',8000,'../images/icon32/user-list.png',NULL,'',8002,'1','','basic/UserPanel.js','JSClass',NULL,'com.ms.basic.UserPanel'),(7,8003,'角色管理',8000,'../images/icon32/role.png',NULL,'',8003,'1','','basic/RolePanel.js;basic/RoleUserWin.js','JSClass',NULL,'com.ms.basic.RolePanel'),(8,100,'检测录入',0,'../images/icon32/1335940031_paste_icon.png',NULL,'',100,'1','','','iframe',NULL,''),(9,101,'检测登记',100,'../images/icon32/1335940368_user1-edit.png',NULL,'',101,'1','','register/TempRegistePanel.js;register/TempRegisterPointPanel.js','JSClass',NULL,'com.ms.controller.register.TempRegistePanel'),(10,102,'标准器管理',100,'../images/icon32/1335940539_flag.png',NULL,'',102,'1','','register/StandardTmpterControllerPanel.js;register/CorrectionPanel.js','JSClass',NULL,'com.ms.controller.register.StandardTmpterControllerPanel'),(11,103,'样本录入',100,'../images/icon32/1335940409_users-edit.png',NULL,'../register/record.jsp',103,'1','','register/RegisterRecordPanel.js','JSClass',NULL,'com.ms.controller.register.RegisterRecordPanel'),(12,106,'检测历史查询',100,'../images/icon32/1335940544_publish.png',NULL,'',106,'1','','register/SampleRecordPanel.js','JSClass',NULL,'com.ms.controller.register.SampleRecordPanel'),(13,105,'实验查询',100,'../images/icon32/1335952649_control_panel_branding.png',NULL,'',105,'1',NULL,'register/DetectRecordPanel.js','JSClass',NULL,'com.ms.controller.register.DetectRecordPanel'),(14,104,'常用检测点管理',100,'../images/icon32/1335953739_Money_Bag.png',NULL,'',104,'1',NULL,'register/DetectTempPanel.js','JSClass',NULL,'com.ms.controller.register.DetectTempPanel');
/*!40000 ALTER TABLE `resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `roleName` varchar(45) DEFAULT NULL,
  `describle` varchar(500) DEFAULT NULL,
  `roleAuth` varchar(45) DEFAULT 'person' COMMENT 'È«¹ú(all), ¸öÈË(person)',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'管理员','管理系统','person'),(2,'普通用户','','person');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roleresource`
--

DROP TABLE IF EXISTS `roleresource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roleresource` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `roleId` int(10) unsigned NOT NULL,
  `nodeId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roleresource`
--

LOCK TABLES `roleresource` WRITE;
/*!40000 ALTER TABLE `roleresource` DISABLE KEYS */;
INSERT INTO `roleresource` VALUES (6,1,8000),(5,1,8001),(4,1,8000),(7,1,8001),(8,1,8002),(9,1,8000),(10,1,8001),(11,1,8002),(12,1,8003),(13,1,100),(14,1,101),(15,1,102),(16,1,103),(17,1,8000),(18,1,8001),(19,1,8002),(20,1,8003),(21,2,100),(22,2,101),(23,2,102),(24,2,103),(25,1,100),(26,1,101),(27,1,102),(28,1,103),(29,1,104),(30,1,8000),(31,1,100),(32,1,101),(33,1,102),(34,1,103),(35,1,104),(36,1,105),(37,1,8000),(38,1,100),(39,1,101),(40,1,102),(41,1,103),(42,1,105),(43,1,106),(44,1,8000),(45,1,100),(46,1,101),(47,1,102),(48,1,103),(49,1,104),(50,1,105),(51,1,106),(52,1,8000);
/*!40000 ALTER TABLE `roleresource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `samplerecord`
--

DROP TABLE IF EXISTS `samplerecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `samplerecord` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '样本ID',
  `detectID` int(11) DEFAULT NULL,
  `temp1` double DEFAULT NULL,
  `temp2` double DEFAULT NULL,
  `temp3` double DEFAULT NULL,
  `temp4` double DEFAULT NULL,
  `tempAvg1` double DEFAULT NULL,
  `tempAvg2` double DEFAULT NULL,
  `result` varchar(45) DEFAULT NULL,
  `createUserID` int(11) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `tempRegisterId` int(11) DEFAULT NULL COMMENT '样本编号',
  `sampleNo` int(11) DEFAULT NULL COMMENT '样本序号',
  `result1` double DEFAULT NULL,
  `result2` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `samplerecord`
--

LOCK TABLES `samplerecord` WRITE;
/*!40000 ALTER TABLE `samplerecord` DISABLE KEYS */;
INSERT INTO `samplerecord` VALUES (1,2,12,12,12,12,12,12,'待测',1,'2013-07-17 15:02:08',NULL,NULL,NULL,NULL),(2,3,12,12,12,12,12,12,'合格',1,'2013-07-17 15:13:50',NULL,NULL,NULL,NULL),(3,4,10,10,NULL,NULL,NULL,NULL,'待测',1,'2013-07-18 11:57:10',4,1,NULL,NULL),(4,5,12,12,NULL,NULL,NULL,NULL,'待测',1,'2013-07-18 12:03:07',5,1,NULL,NULL),(5,6,10,10,NULL,NULL,NULL,NULL,'待测',1,'2013-07-18 12:06:32',5,1,NULL,NULL),(6,6,10,10,NULL,NULL,NULL,NULL,'待测',1,'2013-07-18 12:10:48',5,1,NULL,NULL),(7,7,10,10,20,20,NULL,NULL,'待测',1,'2013-07-18 12:11:37',5,1,NULL,NULL),(8,8,12,12,NULL,NULL,NULL,NULL,'待测',1,'2013-07-18 12:17:05',4,1,NULL,NULL),(9,8,12,12,12,12,NULL,NULL,'待测',1,'2013-07-18 12:17:17',5,2,NULL,NULL),(10,8,12,12,NULL,NULL,NULL,NULL,'待测',1,'2013-07-18 12:17:39',4,3,NULL,NULL),(11,9,10,10,NULL,NULL,NULL,NULL,'待测',1,'2013-07-20 19:54:11',4,1,NULL,NULL),(12,9,10,10,NULL,NULL,NULL,NULL,'待测',1,'2013-07-20 19:54:21',4,2,NULL,NULL),(13,10,15,25,NULL,NULL,20,NULL,'待测',1,'2013-07-20 20:41:51',4,1,NULL,NULL),(14,11,17,19,20,22,18,21,'待测',1,'2013-07-20 20:46:19',5,1,NULL,NULL),(15,12,10,10,NULL,NULL,10,NULL,'待测',1,'2013-07-20 20:52:01',4,1,NULL,NULL),(16,12,10,10,NULL,NULL,10,NULL,'待测',1,'2013-07-20 20:52:06',4,2,NULL,NULL),(17,12,10,10,NULL,NULL,10,NULL,'待测',1,'2013-07-20 20:52:13',4,3,NULL,NULL),(18,12,20,20,NULL,NULL,20,NULL,'待测',1,'2013-07-20 20:52:21',4,4,NULL,NULL),(19,12,20,20,NULL,NULL,20,NULL,'待测',1,'2013-07-20 20:52:32',4,5,NULL,NULL),(20,12,20,20,NULL,NULL,20,NULL,'待测',1,'2013-07-20 20:52:41',4,6,NULL,NULL),(21,12,10,30,NULL,NULL,20,NULL,'待测',1,'2013-07-20 20:52:47',4,7,NULL,NULL),(22,12,20,20,NULL,NULL,20,NULL,'待测',1,'2013-07-20 20:52:54',4,8,NULL,NULL),(23,13,10,12,NULL,NULL,11,NULL,'待测',1,'2013-07-20 23:16:04',4,1,NULL,NULL),(24,14,10,10,20,20,10,20,'待测',1,'2013-07-21 20:50:58',5,1,NULL,NULL),(25,15,20,20,NULL,NULL,20,NULL,'待测',1,'2013-07-21 20:56:29',4,1,NULL,NULL),(26,16,20,20,NULL,NULL,20,NULL,'待测',1,'2013-07-21 20:57:39',4,1,NULL,NULL),(27,17,2,2,2,10,2,6,NULL,1,'2013-08-05 21:51:26',5,1,2,-2);
/*!40000 ALTER TABLE `samplerecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `standardtmpter`
--

DROP TABLE IF EXISTS `standardtmpter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `standardtmpter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tmterNo` varchar(100) DEFAULT NULL COMMENT '温度计编号',
  `certificateNo` varchar(100) DEFAULT NULL COMMENT '证书编号',
  `minTemp` double DEFAULT NULL COMMENT '最小温度',
  `maxTemp` double DEFAULT NULL COMMENT '最大温度',
  `miniScale` double DEFAULT NULL COMMENT '最小分度值',
  `createUserID` int(11) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standardtmpter`
--

LOCK TABLES `standardtmpter` WRITE;
/*!40000 ALTER TABLE `standardtmpter` DISABLE KEYS */;
INSERT INTO `standardtmpter` VALUES (2,'1-10001','1-10001',12,100,10,NULL,'2013-07-14 16:15:41'),(3,'2-00002','2-00002',100,500,12,NULL,'2013-07-14 17:29:24'),(4,'1-10000','aqwqwwq',-50,150,10,1,'2013-07-17 12:18:39');
/*!40000 ALTER TABLE `standardtmpter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `standardtmptercorrection`
--

DROP TABLE IF EXISTS `standardtmptercorrection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `standardtmptercorrection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `standardTmpterId` int(11) DEFAULT NULL COMMENT '标准器ID',
  `value` double DEFAULT NULL COMMENT '计数值',
  `correction` double DEFAULT NULL COMMENT '修正值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standardtmptercorrection`
--

LOCK TABLES `standardtmptercorrection` WRITE;
/*!40000 ALTER TABLE `standardtmptercorrection` DISABLE KEYS */;
INSERT INTO `standardtmptercorrection` VALUES (6,2,10,1),(7,2,20,2),(10,3,200,10),(11,3,300,20),(12,4,0,1),(13,4,10,2),(14,4,30,4),(15,2,30,3);
/*!40000 ALTER TABLE `standardtmptercorrection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tempregister`
--

DROP TABLE IF EXISTS `tempregister`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tempregister` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `unit` varchar(200) DEFAULT NULL COMMENT '送检单位',
  `tmerName` varchar(100) DEFAULT NULL COMMENT '温度计名称:水银温度计，煤油温度计，干湿温度计',
  `minTemp` double DEFAULT NULL COMMENT '最小温度',
  `maxTemp` double DEFAULT NULL COMMENT '最大温度',
  `miniScale` double DEFAULT NULL COMMENT '最小分度值',
  `manufacturer` varchar(200) DEFAULT NULL COMMENT '生产厂家',
  `tmterNo` varchar(100) DEFAULT NULL COMMENT '温度计编号',
  `sampleNo` varchar(100) DEFAULT NULL COMMENT '样品编号',
  `certificateNo` varchar(100) DEFAULT NULL COMMENT '证书编号',
  `result` varchar(45) DEFAULT NULL COMMENT '检测结果：“待测”、“合格”、“不合格”、“断柱”、“损坏”',
  `createUserID` int(11) DEFAULT NULL COMMENT '创建人',
  `createDate` datetime DEFAULT NULL COMMENT '创建时间',
  `tempregisterpointName` varchar(100) DEFAULT NULL,
  `immersionType` varchar(100) DEFAULT NULL COMMENT '浸没方式(全浸、局浸)',
  `sensingLiquid` varchar(100) DEFAULT NULL COMMENT '感温液体(有机、汞基、水银)',
  `outMax` int(11) DEFAULT NULL COMMENT '上限超',
  `outMin` int(11) DEFAULT NULL COMMENT '下限超',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tempregister`
--

LOCK TABLES `tempregister` WRITE;
/*!40000 ALTER TABLE `tempregister` DISABLE KEYS */;
INSERT INTO `tempregister` VALUES (4,'鑫','水银温度计',1,100,10,'','1-0001','','','合格',1,'2013-07-14 21:07:07',NULL,NULL,NULL,NULL,NULL),(5,'ffff','干湿球温度计',-10,100,10,'1213','2-0002','','','待测',1,'2013-07-18 11:14:49','水银温度计检测点',NULL,NULL,NULL,NULL),(6,'工工','石油产品用温度计',10,100,10,'10','10','10','10','待测',1,'2013-07-20 23:02:02','水银温度计检测点',NULL,NULL,NULL,NULL),(7,'测试','水银温度计',20,100,10,'10','1','0','1','待测',1,'2013-08-05 21:21:38','水银温度计检测点','局浸','水银',0,0);
/*!40000 ALTER TABLE `tempregister` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tempregisterpoint`
--

DROP TABLE IF EXISTS `tempregisterpoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tempregisterpoint` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tempRegisterId` int(11) DEFAULT NULL,
  `temp` double DEFAULT NULL COMMENT '温度',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COMMENT='登记检测点';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tempregisterpoint`
--

LOCK TABLES `tempregisterpoint` WRITE;
/*!40000 ALTER TABLE `tempregisterpoint` DISABLE KEYS */;
INSERT INTO `tempregisterpoint` VALUES (6,5,10),(7,5,20),(8,5,30),(9,5,40),(13,6,10),(14,6,20),(15,6,30),(16,6,40),(17,4,10),(18,4,20),(27,7,10),(28,7,20),(29,7,30),(30,7,40);
/*!40000 ALTER TABLE `tempregisterpoint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) DEFAULT NULL,
  `realName` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `insertDate` datetime DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `birthDay` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','管理员','admin',NULL,NULL,'aaaa@aaa.com','男','2013-07-11 00:00:00'),(2,'aa','aa','aa',NULL,NULL,'aa','女','2013-07-12 00:00:00');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userrole` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(10) unsigned NOT NULL,
  `roleId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrole`
--

LOCK TABLES `userrole` WRITE;
/*!40000 ALTER TABLE `userrole` DISABLE KEYS */;
INSERT INTO `userrole` VALUES (1,1,1),(2,2,2);
/*!40000 ALTER TABLE `userrole` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-08-05 21:56:10
