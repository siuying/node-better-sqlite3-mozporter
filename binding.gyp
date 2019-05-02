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
        '-std=c99',
        '-Wno-unused-function',
        '-Wno-sign-compare',
      ],
      'xcode_settings': {
        'OTHER_CFLAGS': [
          '-std=c99',
        ],
        'WARNING_CFLAGS': [
          '-Wno-unused-function',
          '-Wno-sign-compare',
        ],
      }
    }
  ]
}
