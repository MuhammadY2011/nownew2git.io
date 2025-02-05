import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: LoginPage(),
    );
  }
}

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    final TextEditingController _nameController = TextEditingController();

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Ismingizni kiriting'),
        centerTitle: true,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextField(
                controller: _nameController,
                decoration: const InputDecoration(
                  labelText: 'Ismingiz',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  final name = _nameController.text;
                  if (name.isNotEmpty) {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => HomePage(name: name),
                      ),
                    );
                  }
                },
                child: const Text('Kirish'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class HomePage extends StatefulWidget {
  final String name;

  const HomePage({super.key, required this.name});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final TextEditingController _searchController = TextEditingController();
  final List<Map<String, dynamic>> gadgetsList = [
    {
      "title": "iPhone 13 Pro Max",
      "category": "Telefon",
      "image":
          "https://i5.walmartimages.com/seo/Like-New-Apple-iPhone-13-Pro-Max-A2484-1024GB-Graphite-US-Model-Factory-Unlocked-Cell-Phone_3799fa6d-69b3-4396-85ea-dcf72b7cf82c.2dd229ac08aa206ccdb79e98909c8591.jpeg",
      "price": "699 USD",
      "specs": "128GB, 12MP kamera, 4352 mAh batareya"
    },
    {
      "title": "iPad Pro",
      "category": "Planshet",
      "image": "https://brostore.uz/cdn/shop/files/u2.png?v=1700307807",
      "price": "1199 USD",
      "specs": "256GB, 12.9 dyuym ekran, 9720 mAh batareya"
    },
    {
      "title": "Nintendo Switch",
      "category": "Nintendo",
      "image": "https://m.media-amazon.com/images/I/51Gz7IimgoL._SL1024_.jpg",
      "price": "299 USD",
      "specs": "32GB, 6.2 dyuym ekran, 4310 mAh batareya"
    },
    {
      "title": "PlayStation 5",
      "category": "PlayStation",
      "image":
          "https://frankfurt.apollo.olxcdn.com/v1/files/53m0m8q4v1lf3-UZ/image",
      "price": "499 USD",
      "specs": "825GB SSD, DualSense kontrol"
    },
    {
      "title": "TUF Gaming Laptop",
      "category": "Noutbuk",
      "image": "https://images.uzum.uz/cr6ohmfiraat934r7j10/original.jpg",
      "price": "1499 USD",
      "specs": "Intel i7, 16GB RAM, NVIDIA RTX 3060 grafik"
    },
    {
      "title": "PlayStation Steering Wheel",
      "category": "PlayStation",
      "image":
          "https://i5.walmartimages.com/seo/Logitech-G29-Driving-Force-Racing-Wheel-for-Playstation-3-and-Playstation-4_985fd5c1-15aa-4d9d-93aa-f650478a43f2.af6aae4dd0889df27abdf9b810615bc4.jpeg",
      "price": "199 USD",
      "specs": "PS5, PS4, PC, Force Feedback"
    },
    {
      "title": "Samsung Galaxy S21",
      "category": "Telefon",
      "image":
          "https://wefix.co.za/cdn/shop/products/Galaxy-S21-Ultra-Black.png?v=1700426091",
      "price": "799 USD",
      "specs": "256GB, 108MP kamera, 5000 mAh batareya"
    },
    {
      "title": "MacBook Pro 16",
      "category": "Noutbuk",
      "image":
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQgI56vekxYPUPS1O-6RNMejL4q9A9iCY7mA&s",
      "price": "2399 USD",
      "specs": "Apple M1 Pro, 16GB RAM, 1TB SSD"
    },
    {
      "title": "Google Pixel 6",
      "category": "Telefon",
      "image": "https://m.media-amazon.com/images/I/71adnun6E8L.jpg",
      "price": "599 USD",
      "specs": "128GB, 50MP kamera, 4614 mAh batareya"
    },
    {
      "title": "Dell XPS 13",
      "category": "Noutbuk",
      "image":
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq9CKaYfFMVx7qgcZbwcmDcutfaHtDOZS8XQ&s",
      "price": "999 USD",
      "specs": "Intel i7, 16GB RAM, 512GB SSD"
    },
    {
      "title": "MSI Modern 14",
      "category": "Quloqchinlar",
      "image":
          "https://cdn.asaxiy.uz/asaxiy-content/product/items/desktop/021bbc7ee20b71134d53e20206bd6feb2024022716260335729a54dwqmfwK.png.webp",
      "price": "349 USD",
      "specs": " NVIDIA GeForce RTX 2050,  Intel Core i5 "
    },
    {
      "title": "GoPro HERO10",
      "category": "Kamera",
      "image":
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYWGmpRRn5xR4Yf3hiOZ3aCk-r0cstiGZ6kA&s",
      "price": "499 USD",
      "specs": "5.3K video, 23MP fotosuratlar, HyperSmooth 4.0"
    },
  ];

  List<Map<String, dynamic>> filteredGadgetsList = [];
  Timer? _timer;
  String profileImage =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmZUq_im5xfAwetyOB8xgrYrDcN4yi4-naug4CwlwFY4o4MD27XX5mdA2rVRgIuml_SHs&usqp=CAU';
  List<String> questions = [];
  List<String> quizResponses = [];

  @override
  void initState() {
    super.initState();
    filteredGadgetsList = gadgetsList;
    _startTimer();
    _loadProfileImage();
    _loadQuestions();
    _loadQuizResponses();
  }

  @override
  void dispose() {
    _timer?.cancel();
    _searchController.dispose();
    super.dispose();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(hours: 2), (timer) {
      _updateGadgetsList();
    });
  }

  void _updateGadgetsList() {
    setState(() {
      gadgetsList.shuffle();
      filteredGadgetsList = gadgetsList;
    });
  }

  void filterGadgets(String query) {
    setState(() {
      filteredGadgetsList = gadgetsList
          .where((gadget) =>
              gadget["title"].toLowerCase().contains(query.toLowerCase()) ||
              gadget["category"].toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }

  void addComment(int index) {
    TextEditingController commentController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Fikr qo\'shish'),
          content: TextField(
            controller: commentController,
            decoration:
                const InputDecoration(hintText: 'Fikringizni yozing...'),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Bekor qilish'),
            ),
            TextButton(
              onPressed: () {
                setState(() {
                  filteredGadgetsList[index]["comments"]
                      .add(commentController.text);
                });
                Navigator.of(context).pop();
              },
              child: const Text('Qo\'shish'),
            ),
          ],
        );
      },
    );
  }

  void _launchURL(String url) async {
    final Uri uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    } else {
      throw 'Could not launch $url';
    }
  }

  Future<void> _loadProfileImage() async {
    final response = await http.get(Uri.parse(
        "https://resizer.mail.ru/p/4797b29c-9adc-5f58-be6b-99dd20106e53/AQAKpl9Xaxc10sAnnefjGeOZHRnXyL1xtpu41ox6AiqG3UlAwhHQW5oAcpBNfc2oXDDKLQEZTHI2M8bKy1at7fPqP40.png"));
    if (response.statusCode == 200) {
      List<dynamic> data = jsonDecode(response.body);
      setState(() {
        profileImage = data[0]['url'];
      });
    } else {
      throw Exception('Profil rasmini yuklab bo\'lmadi');
    }
  }

  Future<void> _loadQuestions() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      questions = prefs.getStringList('questions') ?? [];
    });
  }

  Future<void> _saveQuestion(String question) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      questions.add(question);
      prefs.setStringList('questions', questions);
    });
  }

  Future<void> _loadQuizResponses() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      quizResponses = prefs.getStringList('quizResponses') ?? [];
    });
  }

  Future<void> _saveQuizResponse(String response) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      quizResponses.add(response);
      prefs.setStringList('quizResponses', quizResponses);
    });
  }

  void _showUnderConstructionMessage() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Qurilishda'),
          content: const Text('Bu funksiya hozirda mavjud emas.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  void _showQuiz() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Viktorina'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('Nimani qo\'shamiz? Keyingi Yangilashlarda'),
              const SizedBox(height: 10),
              ElevatedButton(
                onPressed: () {
                  _saveQuizResponse('Kategoriyalar');
                  Navigator.of(context).pop();
                  _showResponseAccepted();
                },
                child: const Text('Kategoriyalar'),
              ),
              ElevatedButton(
                onPressed: () {
                  _saveQuizResponse('Global odamlarni ko\'rish');
                  Navigator.of(context).pop();
                  _showResponseAccepted();
                },
                child: const Text('Global odamlarni ko\'rish'),
              ),
              ElevatedButton(
                onPressed: () {
                  _saveQuizResponse('O\'yin katalog');
                  Navigator.of(context).pop();
                  _showResponseAccepted();
                },
                child: const Text('O\'yin katalog'),
              ),
              ElevatedButton(
                onPressed: () {
                  _saveQuizResponse('button');
                  Navigator.of(context).pop();
                  _showResponseAccepted();
                },
                child: const Text(
                    'o\'yinlar o\'ynab adminlik serverini ytib olish'),
              ),
            ],
          ),
        );
      },
    );
  }

  void _showResponseAccepted() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Javob qabul qilindi'),
          content: const Text('Sizning javobingiz qabul qilindi.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  void _showQuizResponses() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Viktorina javoblari'),
          content: Container(
            width: double.maxFinite,
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: quizResponses.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(quizResponses[index]),
                );
              },
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Yopish'),
            ),
          ],
        );
      },
    );
  }

  void _showMessages() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Savollar'),
          content: Container(
            width: double.maxFinite,
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: questions.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(questions[index]),
                );
              },
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Yopish'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 50.0,
        // AppBarni kattalashtirish
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              colors: [Colors.white, Colors.white],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
        ),
        centerTitle: true,
        title: const Text(
          'Market place',
          style: TextStyle(color: Colors.black, fontSize: 24),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.home, color: Colors.black),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const LoginPage()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.search, color: Colors.black),
            onPressed: () {
              showSearch(
                  context: context,
                  delegate: GadgetsSearchDelegate(gadgetsList));
            },
          ),
          IconButton(
            icon: const Icon(Icons.quiz, color: Colors.black),
            onPressed: _showQuiz,
          ),
        ],
      ),
      drawer: Drawer(
        child: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Colors.black, Colors.black],
            ),
          ),
          child: SafeArea(
            child: Column(
              children: [
                if (profileImage.isNotEmpty)
                  CircleAvatar(
                    backgroundColor: Colors.white,
                    backgroundImage: NetworkImage(profileImage),
                    radius: 90,
                  ),
                const SizedBox(height: 10),
                Text(
                  widget.name,
                  style: const TextStyle(
                      fontSize: 20, // Ism kattaligi
                      color: Colors.white,
                      fontWeight: FontWeight.bold),
                ),
                if (widget.name == 'MuhammadY2011')
                  const Text(
                    "Prezident",
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.yellow,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                if (widget.name == 'Admin2' ||
                    widget.name == 'admin000aspirine' ||
                    widget.name == 'admin1112011' ||
                    widget.name == 'admin525252')
                  const Text(
                    "Admin",
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.yellow,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                const Divider(color: Colors.white),
                ListTile(
                  leading: const Icon(Icons.home, color: Colors.white),
                  title:
                      const Text("Home", style: TextStyle(color: Colors.white)),
                  onTap: _showUnderConstructionMessage,
                ),
                ListTile(
                  leading: const Icon(Icons.settings, color: Colors.white),
                  title: const Text("Settings",
                      style: TextStyle(color: Colors.white)),
                  onTap: _showUnderConstructionMessage,
                ),
                ListTile(
                  leading: const Icon(Icons.logout, color: Colors.white),
                  title: const Text("Logout",
                      style: TextStyle(color: Colors.white)),
                  onTap: _showUnderConstructionMessage,
                ),
                const Divider(color: Colors.white),
                ListTile(
                  leading: const Icon(Icons.telegram, color: Colors.white),
                  title: const Text("Telegram Channel",
                      style: TextStyle(color: Colors.white)),
                  onTap: () {
                    _launchURL("https://t.me/nownewsuz");
                  },
                ),
                const Divider(color: Colors.white),
                if (widget.name != 'MuhammadY2011' &&
                    widget.name != 'Admin2' &&
                    widget.name != 'admin000aspirine' &&
                    widget.name != 'admin1112011' &&
                    widget.name != 'admin525252')
                  ListTile(
                    leading: const Icon(Icons.help, color: Colors.white),
                    title: const Text("Helper",
                        style: TextStyle(color: Colors.white)),
                    onTap: () {
                      showDialog(
                          context: context,
                          builder: (context) {
                            TextEditingController helpController =
                                TextEditingController();
                            return AlertDialog(
                              title: const Text('Yordam'),
                              content: TextField(
                                controller: helpController,
                                decoration: const InputDecoration(
                                    hintText: 'Savolingizni yozing...'),
                              ),
                              actions: [
                                TextButton(
                                  onPressed: () {
                                    Navigator.of(context).pop();
                                  },
                                  child: const Text('Bekor qilish'),
                                ),
                                TextButton(
                                  onPressed: () {
                                    String helpQuery = helpController.text;
                                    _saveQuestion(helpQuery);
                                    Navigator.of(context).pop();
                                  },
                                  child: const Text('Yuborish'),
                                ),
                              ],
                            );
                          });
                    },
                  ),
                const Divider(color: Colors.white),
                if (widget.name == 'MuhammadY2011' ||
                    widget.name == 'Admin2' ||
                    widget.name == 'admin000aspirine' ||
                    widget.name == 'admin1112011' ||
                    widget.name == 'admin525252')
                  ListTile(
                    leading:
                        const Icon(Icons.question_answer, color: Colors.white),
                    title: const Text("Viktorina javoblari",
                        style: TextStyle(color: Colors.white)),
                    onTap: () {
                      _showQuizResponses();
                    },
                  ),
                if (widget.name == 'MuhammadY2011')
                  ListTile(
                    leading: const Icon(Icons.message, color: Colors.white),
                    title: const Text("Messages",
                        style: TextStyle(color: Colors.white)),
                    onTap: () {
                      _showMessages();
                    },
                  ),
              ],
            ),
          ),
        ),
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.grey, Colors.grey],
          ),
        ),
        child: LayoutBuilder(
          builder: (context, constraints) {
            int crossAxisCount = constraints.maxWidth < 113 ? 1 : 2;
            return GridView.builder(
              padding: const EdgeInsets.all(8),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: crossAxisCount,
                crossAxisSpacing: 0.94,
                mainAxisSpacing: 0.94,
                childAspectRatio: 0.94,
              ),
              itemCount: filteredGadgetsList.length,
              itemBuilder: (context, index) {
                return Card(
                  color: Colors.white,
                  elevation: 3.0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                  child: Column(
                    children: [
                      Image.network(
                        filteredGadgetsList[index]["image"],
                        height: 150,
                        fit: BoxFit.cover,
                      ),
                      Padding(
                        padding: const EdgeInsets.all(5.0),
                        child: Text(
                          filteredGadgetsList[index]["title"],
                          style: const TextStyle(
                              fontSize: 14, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.center,
                        ),
                      ),
                      Text(
                        filteredGadgetsList[index]["price"],
                        style:
                            const TextStyle(color: Colors.grey, fontSize: 12),
                      ),
                      Text(
                        filteredGadgetsList[index]["specs"],
                        style:
                            const TextStyle(color: Colors.grey, fontSize: 10),
                      ),
                      TextButton(
                        onPressed: () =>
                            _launchURL(filteredGadgetsList[index]["url"]),
                        child: const Text('Batafsil',
                            style: TextStyle(fontSize: 12)),
                      ),
                    ],
                  ),
                );
              },
            );
          },
        ),
      ),
    );
  }
}

class GadgetsSearchDelegate extends SearchDelegate {
  final List<Map<String, dynamic>> gadgetsList;

  GadgetsSearchDelegate(this.gadgetsList);

  @override
  List<Widget>? buildActions(BuildContext context) {
    return [
      IconButton(
        icon: const Icon(Icons.clear),
        onPressed: () {
          query = '';
          showSuggestions(context);
        },
      ),
    ];
  }

  @override
  Widget? buildLeading(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.arrow_back),
      onPressed: () {
        close(context, null);
      },
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    final results = gadgetsList
        .where((gadget) =>
            gadget["title"].toLowerCase().contains(query.toLowerCase()) ||
            gadget["category"].toLowerCase().contains(query.toLowerCase()))
        .toList();

    return ListView.builder(
      itemCount: results.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(results[index]["title"]),
          leading: Image.network(
            results[index]["image"],
            width: 50,
            fit: BoxFit.cover,
          ),
          subtitle: Text(results[index]["price"]),
          onTap: () {
            _launchURL(results[index]["url"]);
          },
        );
      },
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    final suggestions = gadgetsList
        .where((gadget) =>
            gadget["title"].toLowerCase().contains(query.toLowerCase()) ||
            gadget["category"].toLowerCase().contains(query.toLowerCase()))
        .toList();

    return ListView.builder(
      itemCount: suggestions.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(suggestions[index]["title"]),
          leading: Image.network(
            suggestions[index]["image"],
            width: 50,
            fit: BoxFit.cover,
          ),
          subtitle: Text(suggestions[index]["price"]),
          onTap: () {
            query = suggestions[index]["title"];
            showResults(context);
          },
        );
      },
    );
  }

  void _launchURL(String url) async {
    final Uri uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    } else {
      throw 'Could not launch $url';
    }
  }
}
