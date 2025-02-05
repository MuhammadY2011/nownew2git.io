import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:quran_app/models/surah_model.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<SurahModel> surahs = [];

  @override
  void initState() {
    super.initState();
  }

  void load() async {
    String data = await rootBundle.loadString("assets/surah.json");
    List listData = List.from(jsonDecode(data));
    surahs = listData.map((json) => SurahModel.fromJson(json)).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemCount: surahs.length,
        itemBuilder: (_, int index) {
          SurahModel surah = surahs[index];
          return ListTile(
            leading: Text(surah.id.toString()),
            title: Text("$surah("") "),
          );
        },
      ),
    );
  }
}
