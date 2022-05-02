{
  "targets": [
    {
      "target_name": "mozporter",
      "type": "shared_library",
      "sources": [
        "vendor/Normalize.c",
        "vendor/fts3_porter.c",
        "vendor/rank.m"
      ],
      'dependencies': ["./node_modules/better-sqlite3/deps/sqlite3.gyp:sqlite3"],
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
