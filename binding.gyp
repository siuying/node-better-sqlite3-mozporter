{
  "targets": [
    {
      "target_name": "sqlite3-fts-cjk",
      "type": "shared_library",
      "sources": [
        "vendor/Normalize.c",
        "vendor/fts3_porter.c",
        "vendor/rank.m"
      ],
      'cflags': [
        '-std=c++11',
      ],
      'xcode_settings': {
        'OTHER_CPLUSPLUSFLAGS': [
          '-std=c++11',
          '-stdlib=libc++',
        ],
      }
    }
  ]
}
